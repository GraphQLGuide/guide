/* eslint-disable graphql/template-strings */

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const USER_QUERY = gql`
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
    }
    loginInProgress @client
  }
`

export const withUser = graphql(USER_QUERY, {
  props: ({ data: { currentUser, loading, loginInProgress } }) => ({
    user: currentUser,
    loggingIn: loading || loginInProgress
  })
})
