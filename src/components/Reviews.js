import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import FavoriteIcon from 'material-ui-icons/Favorite'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Modal from 'material-ui/Modal'
import { propType } from 'graphql-anywhere'

import Review from './Review'
import AddReview from './AddReview'

import { REVIEWS_QUERY, REVIEW_ENTRY } from '../graphql/Review'

class Reviews extends Component {
  state = {
    addingReview: false
  }

  addReview = () => {
    this.setState({ addingReview: true })
  }

  doneAddingReview = () => {
    this.setState({ addingReview: false })
  }

  render() {
    const { reviews, loading, user } = this.props
    const favoriteCount = get(user, 'favoriteReviews.length')

    return (
      <main className="Reviews mui-fixed">
        <div className="Reviews-header-wrapper">
          <header className="Reviews-header">
            {favoriteCount && (
              <div className="Reviews-favorite-count">
                <FavoriteIcon />
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
              reviews.map(review => (
                <Review key={review.id} review={review} user={user} />
              ))
            )}

          {user && (
            <div>
              <Button
                onClick={this.addReview}
                variant="fab"
                color="primary"
                className="Reviews-add"
              >
                <AddIcon />
              </Button>

              <Modal
                open={this.state.addingReview}
                onClose={this.doneAddingReview}
              >
                <AddReview done={this.doneAddingReview} user={user} />
              </Modal>
            </div>
          )}
        </div>
      </main>
    )
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(propType(REVIEW_ENTRY)),
  loading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    favoriteReviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    )
  })
}

const withReviews = graphql(REVIEWS_QUERY, {
  options: { errorPolicy: 'all' },
  props: ({ data: { reviews, loading } }) => ({
    reviews,
    loading
  })
})

export default withReviews(Reviews)
