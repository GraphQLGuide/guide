import React from 'react'
import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import compose from 'recompose/compose'
import { graphql, withApollo } from '@apollo/react-hoc'
import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import auth0 from 'auth0-js'
import { initAuthHelpers, login, logout } from 'auth0-helpers'
import LogRocket from 'logrocket'
import defer from 'lodash/defer'
import ReactGA from 'react-ga'

import { associateToken } from '../lib/payment'

const client = new auth0.WebAuth({
  domain: 'graphql.auth0.com',
  clientID: '8fErnZoF3hbzQ2AbMYu5xcS0aVNzQ0PC',
  responseType: 'token',
  audience: 'https://api.graphql.guide',
  scope: 'openid profile guide',
})

initAuthHelpers({
  client,
  usePopup: true,
  authOptions: {
    connection: 'github',
    owp: true,
    popupOptions: { height: 623 }, // make tall enough for content
  },
  checkSessionOptions: {
    redirect_uri: window.location.origin,
  },
  onError: (e) => console.error(e),
})

const USER_QUERY = gql`
  query UserQuery {
    currentUser {
      id
      firstName
      name
      username
      email
      photo
      hasPurchased
      favoriteReviews {
        id
      }
      hasTshirt
    }
  }
`

const withUser = graphql(USER_QUERY, {
  props: ({ ownProps, data: { currentUser, loading } }) => ({
    currentUser,
    loading,
    ownProps,
  }),
})

function withAuth(BaseComponent) {
  class WithAuthWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        loggingIn: false,
      }

      defer(this.onCreateOrUpdate)
    }

    componentDidUpdate() {
      this.onCreateOrUpdate()
    }

    onCreateOrUpdate = () => {
      const { currentUser } = this.props
      if (!currentUser) {
        return
      }

      if (currentUser === this.lastCurrentUser) {
        return
      }

      associateToken()
      const { id, name, email, hasPurchased } = currentUser
      const userData = {
        name,
        email,
        hasPurchased,
      }

      window.heap.identify(id, 'ID')
      window.heap.addUserProperties(userData)
      ReactGA.set({
        id,
        ...userData,
      })
      LogRocket.identify(id, userData)

      this.lastCurrentUser = currentUser
    }

    associateTokenWithUser = () => {
      associateToken()
    }

    login = () => {
      this.setState({ loggingIn: true })
      login({
        onCompleted: (e, t) => {
          e && console.log(e)
          this.props.client.reFetchObservableQueries()
          this.setState({ loggingIn: false })
        },
      })
    }

    logout = () => {
      logout()
      this.props.client.resetStore()
    }

    render() {
      const { currentUser, loading, ownProps } = this.props

      return (
        <BaseComponent
          user={currentUser}
          loading={loading || this.state.loggingIn}
          login={this.login}
          logout={this.logout}
          {...ownProps}
        />
      )
    }
  }

  WithAuthWrapper.propTypes = {
    currentUser: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      hasPurchased: PropTypes.string,
      tshirt: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
    client: PropTypes.instanceOf(ApolloClient).isRequired,
  }

  WithAuthWrapper.displayName = wrapDisplayName(BaseComponent, 'withAuth')
  return compose(withApollo, withUser)(WithAuthWrapper)
}

export default withAuth
