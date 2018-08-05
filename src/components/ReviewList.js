import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

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
    const { reviews, user, orderBy } = this.props

    return (
      <div className="Reviews-list">
        <div className="Reviews-content">
          {reviews &&
            reviews.map(review => (
              <Review
                key={review.id}
                review={review}
                user={user}
                orderBy={orderBy}
              />
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
  props: ({ data: { reviews, fetchMore, networkStatus } }) => ({
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
    }
  })
})

export default withReviews(ReviewList)
