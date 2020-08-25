import React from 'react'
import { gql, useQuery } from '@apollo/client'

import Review from './Review'

const REVIEWS_QUERY = gql`
  query ReviewsQuery {
    reviews(limit: 20) {
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
  }
`

export default () => {
  const { data: { reviews } = {}, loading } = useQuery(REVIEWS_QUERY)

  return (
    <main className="Reviews mui-fixed">
      <div className="Reviews-header-wrapper">
        <header className="Reviews-header">
          <h1>Reviews</h1>
        </header>
      </div>
      <div className="Reviews-content">
        {loading ? (
          <div className="Spinner" />
        ) : (
          reviews.map((review) => <Review key={review.id} review={review} />)
        )}
      </div>
    </main>
  )
}
