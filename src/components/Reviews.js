import React, { Component } from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import { Favorite, Add } from '@material-ui/icons'
import { Fab, Modal } from '@material-ui/core'

import ReviewList from './ReviewList'
import { withUser } from '../lib/withUser'
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
            {favoriteCount ? (
              <div className="Reviews-favorite-count">
                <Favorite />
                {favoriteCount}
              </div>
            ) : null}
            <h1>Reviews</h1>
          </header>
        </div>

        <ReviewList user={user} />

        {user && (
          <div>
            <Fab
              onClick={this.addReview}
              color="primary"
              className="Reviews-add"
            >
              <Add />
            </Fab>

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

export default withUser(Reviews)
