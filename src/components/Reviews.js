import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import FavoriteIcon from 'material-ui-icons/Favorite'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Modal from 'material-ui/Modal'

import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'

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
    const { user } = this.props
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

        <ReviewList user={user} />

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
              <ReviewForm done={this.doneAddingReview} user={user} />
            </Modal>
          </div>
        )}
      </main>
    )
  }
}

Reviews.propTypes = {
  user: PropTypes.shape({
    favoriteReviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    )
  })
}

export default Reviews
