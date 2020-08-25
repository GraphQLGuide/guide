import React from 'react'
import { gql, useQuery } from '@apollo/client'
import get from 'lodash/get'
import { Favorite } from '@material-ui/icons'

import Review from './Review'
import { useUser } from '../lib/useUser'

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

  const { user } = useUser()
  const favoriteCount = get(user, 'favoriteReviews.length')

  return (
    <main className="Reviews mui-fixed">
      <div className="Reviews-header-wrapper">
        <header className="Reviews-header">
          {favoriteCount && (
            <div className="Reviews-favorite-count">
              <Favorite />
              {favoriteCount}
            </div>
          )}
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
