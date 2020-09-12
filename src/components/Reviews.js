import React, { useState } from 'react'
import get from 'lodash/get'
import { Favorite, Add } from '@material-ui/icons'
import { Fab, Modal } from '@material-ui/core'

import { useUser } from '../lib/useUser'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

export default () => {
  const [addingReview, setAddingReview] = useState(false)

  const { user } = useUser()
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

      <ReviewList />

      {user && (
        <div>
          <Fab
            onClick={() => setAddingReview(true)}
            color="primary"
            className="Reviews-add"
          >
            <Add />
          </Fab>

          <Modal open={addingReview} onClose={() => setAddingReview(false)}>
            <ReviewForm done={() => setAddingReview(false)} />
          </Modal>
        </div>
      )}
    </main>
  )
}
