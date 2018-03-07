import gql from 'graphql-tag'

export const REVIEW_ENTRY = gql`
  fragment ReviewEntry on Review {
    id
    text
    stars
    createdAt
    favorited
    author {
      name
      photo
      username
    }
  }
`

export const REVIEWS_QUERY = gql`
  query ReviewsQuery($skip: Int, $limit: Int) {
    reviews(skip: $skip, limit: $limit) {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`
