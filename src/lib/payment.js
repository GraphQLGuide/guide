import { Component } from 'react'
import gql from 'graphql-tag'

import { apollo } from './apollo'
import track from './track'
import { fireworks } from './confetti'

// https://stripe.com/docs/checkout#integration-custom
// https://stripe.com/docs/checkout/express
// https://medium.com/consciousapps/integrating-stripe-with-react-graphql-and-apollo-client-e09fdc9e5b95

// https://github.com/stripe/react-stripe-elements
// https://stripe.com/docs/stripe-js/elements/payment-request-button

const CHARGE_MUTATION = gql`
  mutation ChargeMutation($input: ChargeInput!) {
    charge(input: $input)
  }
`

const ASSOCIATE_TOKEN_MUTATION = gql`
  mutation AssociateToken($stripeToken: String!) {
    associateToken(stripeToken: $stripeToken) {
      id
      hasPurchased
    }
  }
`

let stripeHandler
let scriptLoaded = false
const callbackQueue = []

console.log('stripe', process.env.REACT_APP_STRIPE_PUBLIC_KEY)
const scriptDidLoad = () => {
  console.log('stripe loaded', process.env.REACT_APP_STRIPE_PUBLIC_KEY)
  scriptLoaded = true
  stripeHandler = window.StripeCheckout.configure({
    key: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
    image:
      'https://res.cloudinary.com/graphql/image/upload/f_auto,q_auto/logo-pink-circle',
    name: 'The GraphQL Guide',
    locale: 'auto'
  })
  callbackQueue.map(cb => cb(stripeHandler))
}

const onScriptLoaded = callback => {
  if (scriptLoaded) {
    callback(stripeHandler)
  } else {
    callbackQueue.push(callback)
  }
}

let addedStripeScript = false

class LoadStripe extends Component {
  componentDidMount() {
    if (addedStripeScript) {
      return
    }
    addedStripeScript = true

    const script = document.createElement('script')
    script.src = 'https://checkout.stripe.com/checkout.js'
    script.async = 1
    script.onload = scriptDidLoad

    document.body.appendChild(script)
  }

  render() {
    return this.props.children
  }
}

export const stripeCheckout = (packageInfo, routerHistory) => {
  onScriptLoaded(handler => {
    const promptForAddresses = !!(packageInfo.full || packageInfo.training)
    // https://stripe.com/docs/checkout#integration-simple-options
    handler.open({
      description: packageInfo.name,
      amount: packageInfo.price * 100,
      billingAddress: promptForAddresses,
      shippingAddress: promptForAddresses,

      // https://stripe.com/docs/checkout#integration-simple-options
      token: async ({ id, email }, addresses) => {
        localStorage.setItem('stripe.token', id)
        localStorage.setItem('stripe.email', email)
        localStorage.setItem('package', packageInfo.key)
        localStorage.removeItem('stripe.associatedTokenWithUser')

        fireworks()

        const { key: packageName, licenses: teamLicenses } = packageInfo

        // https://www.apollographql.com/docs/react/api/apollo-client.html#ApolloClient.mutate
        const response = await apollo.mutate({
          mutation: CHARGE_MUTATION,
          variables: {
            input: {
              package: packageName,
              stripeToken: id,
              teamLicenses,
              email,
              addresses
            }
          }
        })

        // todo switch to thrown error message instead of {charge: false}
        if (!response.data || !response.data.charge) {
          alert('Charge failed 🤷‍♀️. Please try another payment method.')
          return
        }

        routerHistory.push('/welcome')

        track('purchase', {
          packageName,
          teamLicenses
        })
      }
    })
  })
}

let associatingInProgress = false

export const associateToken = async () => {
  if (associatingInProgress) {
    return
  }

  const token = localStorage.getItem('stripe.token')
  if (!token) {
    return
  }

  const done = localStorage.getItem('stripe.associatedTokenWithUser') === 'true'
  if (done) {
    return
  }

  associatingInProgress = true
  const response = await apollo.mutate({
    mutation: ASSOCIATE_TOKEN_MUTATION,
    variables: { stripeToken: token }
  })
  associatingInProgress = false

  if (response.data.associateToken) {
    localStorage.setItem('stripe.associatedTokenWithUser', true)
  }
}

export default LoadStripe
