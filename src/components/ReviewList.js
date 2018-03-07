import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import find from 'lodash/find'

import Review from './Review'

import { REVIEWS_QUERY, REVIEW_ENTRY } from '../graphql/Review'

const FETCH_MORE = 3

class ReviewList extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
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
  user: PropTypes.object
}

const withReviews = graphql(REVIEWS_QUERY, {
  options: {
    errorPolicy: 'all',
    variables: { skip: 0, limit: 10 },
    notifyOnNetworkStatusChange: true
  },
  props: ({ data: { reviews, fetchMore, networkStatus } }) => ({
    reviews,
    networkStatus,
    loadMoreReviews: () => {
      return fetchMore({
        variables: { skip: reviews.length - 5, limit: 15 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.reviews) {
            return previousResult
          }

          const newReviews = fetchMoreResult.reviews.filter(
            ({ id }) => !find(previousResult.reviews, { id })
          )

          return {
            ...previousResult,
            reviews: [...previousResult.reviews, ...newReviews]
          }
        }
      })
    }
  })
})

export default withReviews(ReviewList)
