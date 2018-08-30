import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const USER_QUERY = gql`
  query UserQuery {
    currentUser {
      firstName
      name
      username
      email
      photo
      hasPurchased
    }
  }
`

export const withUser = graphql(USER_QUERY, {
  props: ({ data: { currentUser, loading } }) => ({
    user: currentUser,
    loggingIn: loading
  })
})
