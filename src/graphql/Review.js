import gql from 'graphql-tag'

export const REVIEW_ENTRY = gql`
  fragment ReviewEntry on Review {
    id
    text
    stars
    createdAt
    favorited
    author {
      id
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

export const REVIEW_QUERY_INITIAL_VARIABLES = {
  skip: 0,
  limit: 10,
}

export const REVIEWS_QUERY_FROM_CACHE = {
  query: REVIEWS_QUERY,
  variables: REVIEW_QUERY_INITIAL_VARIABLES,
}
