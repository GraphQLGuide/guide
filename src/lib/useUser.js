import { gql, useQuery } from '@apollo/client'

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
  }
`

export function useUser() {
  const { data, loading } = useQuery(USER_QUERY)

  return {
    user: data && data.currentUser,
    loggingIn: loading,
  }
}
