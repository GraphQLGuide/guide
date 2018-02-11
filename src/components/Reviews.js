import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import get from 'lodash/get'
import FavoriteIcon from 'material-ui-icons/Favorite'

import Review from './Review'

const Reviews = ({ reviews, loading, user }) => {
  const favoriteCount = get(user, 'favoriteReviews.length')

  return (
    <main className="Reviews mui-fixed">
      <div className="Reviews-header-wrapper">
        <header className="Reviews-header">
          {favoriteCount ? (
            <div className="Reviews-favorite-count">
              <FavoriteIcon />
              {favoriteCount}
            </div>
          ) : null}
          <h1>Reviews</h1>
        </header>
      </div>
      <div className="Reviews-content">
        {loading ? (
          <div className="Spinner" />
        ) : (
          reviews.map(review => <Review key={review.id} review={review} />)
        )}
      </div>
    </main>
  )
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    favoriteReviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    )
  })
}

const REVIEWS_QUERY = gql`
  query ReviewsQuery {
    reviews(limit: 20) {
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
  }
`

const withReviews = graphql(REVIEWS_QUERY, {
  props: ({ data: { reviews, loading } }) => ({ reviews, loading })
})

export default withReviews(Reviews)
