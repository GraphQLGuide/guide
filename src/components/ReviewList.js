import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import reject from 'lodash/reject'

import Review from './Review'

import {
  REVIEWS_QUERY,
  REVIEW_ENTRY,
  ON_REVIEW_CREATED_SUBSCRIPTION,
  ON_REVIEW_UPDATED_SUBSCRIPTION,
  ON_REVIEW_DELETED_SUBSCRIPTION
} from '../graphql/Review'

const FETCH_MORE = 3

class ReviewList extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.props.subscribeToReviewUpdates()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = event => {
    if (this.props.networkStatus === FETCH_MORE) {
      return
    }

    const currentScrollHeight = window.scrollY + window.innerHeight
    const pixelsFromBottom =
      document.documentElement.scrollHeight - currentScrollHeight
    if (pixelsFromBottom < 250) {
      this.props.loadMoreReviews()
    }
  }

  render() {
    const { reviews, user } = this.props

    return (
      <div className="Reviews-list">
        <div className="Reviews-content">
          {reviews &&
            reviews.map(review => (
              <Review key={review.id} review={review} user={user} />
            ))}
        </div>
        <div className="Spinner" />
      </div>
    )
  }
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(propType(REVIEW_ENTRY)),
  user: PropTypes.object,
  orderBy: PropTypes.string.isRequired
}

const withReviews = graphql(REVIEWS_QUERY, {
  options: ({ orderBy }) => ({
    errorPolicy: 'all',
    variables: { limit: 10, orderBy },
    notifyOnNetworkStatusChange: true
  }),
  props: ({
    data: { reviews, fetchMore, networkStatus, subscribeToMore },
    ownProps: { orderBy }
  }) => ({
    reviews,
    networkStatus,
    loadMoreReviews: () => {
      if (!reviews) {
        return
      }

      const lastId = reviews[reviews.length - 1].id
      return fetchMore({
        variables: { after: lastId },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.reviews) {
            return previousResult
          }

          return {
            ...previousResult,
            reviews: [...previousResult.reviews, ...fetchMoreResult.reviews]
          }
        }
      })
    },
    subscribeToReviewUpdates: () => {
      subscribeToMore({
        document: ON_REVIEW_CREATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          // Assuming infinite reviews, we don't need to add new reviews to
          // Oldest list
          if (orderBy === 'createdAt_ASC') {
            return prev
          }

          const newReview = subscriptionData.data.reviewCreated
          return {
            reviews: [newReview, ...prev.reviews]
          }
        }
      })
      subscribeToMore({
        document: ON_REVIEW_UPDATED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          const updatedReview = subscriptionData.data.reviewUpdated
          return {
            reviews: prev.reviews.map(review =>
              review.id === updatedReview.id ? updatedReview : review
            )
          }
        }
      })
      subscribeToMore({
        document: ON_REVIEW_DELETED_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          const deletedId = subscriptionData.data.reviewDeleted
          return {
            reviews: reject(prev.reviews, { id: deletedId })
          }
        }
      })
    }
  })
})

export default withReviews(ReviewList)
