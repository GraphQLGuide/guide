import { HttpLink, split, ApolloLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { getAuthToken } from 'auth0-helpers'
import { RestLink } from 'apollo-link-rest'

import { errorLink } from './errorLink'

export const spaceXLink = ApolloLink.from([
  errorLink,
  new HttpLink({
    uri: 'https://api.spacex.land/graphql',
  }),
])

const httpLink = new HttpLink({
  uri: 'https://api.graphql.guide/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken({
    doLoginIfTokenExpired: true,
  })

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  } else {
    return { headers }
  }
})

const authedHttpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `wss://api.graphql.guide/subscriptions`,
  options: {
    reconnect: true,
  },
})

const networkLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authedHttpLink
)

const restLink = new RestLink({
  uri: 'https://api.openweathermap.org/data/2.5/',
})

const link = ApolloLink.from([errorLink, restLink, networkLink])

export default link
