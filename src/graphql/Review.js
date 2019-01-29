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
  query ReviewsQuery($after: ObjID, $limit: Int, $orderBy: ReviewOrderBy) {
    reviews(after: $after, limit: $limit, orderBy: $orderBy) {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

export const ON_REVIEW_CREATED_SUBSCRIPTION = gql`
  subscription onReviewCreated {
    reviewCreated {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

export const ON_REVIEW_UPDATED_SUBSCRIPTION = gql`
  subscription onReviewUpdated {
    reviewUpdated {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

export const ON_REVIEW_DELETED_SUBSCRIPTION = gql`
  subscription onReviewDeleted {
    reviewDeleted
  }
`
