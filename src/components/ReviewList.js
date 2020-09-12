import React, { useEffect } from 'react'
import { useQuery, NetworkStatus } from '@apollo/client'
import throttle from 'lodash/throttle'
import find from 'lodash/find'

import Review from './Review'
import {
  REVIEWS_QUERY,
  REVIEW_QUERY_INITIAL_VARIABLES,
} from '../graphql/Review'

export default () => {
  const { data, fetchMore, networkStatus } = useQuery(REVIEWS_QUERY, {
    variables: REVIEW_QUERY_INITIAL_VARIABLES,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  })

  const reviews = (data && data.reviews) || []

  const onScroll = throttle(() => {
    if (networkStatus !== NetworkStatus.fetchMore) {
      const currentScrollHeight = window.scrollY + window.innerHeight
      const pixelsFromBottom =
        document.documentElement.scrollHeight - currentScrollHeight
      const closeToBottom = window.scrollY > 0 && pixelsFromBottom < 250

      if (closeToBottom) {
        fetchMore({
          variables: { skip: reviews.length - 5, limit: 15 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const noNewResults =
              !fetchMoreResult ||
              !fetchMoreResult.reviews ||
              fetchMoreResult.reviews.length === 0

            if (noNewResults) {
              return previousResult
            }

            const newReviews = fetchMoreResult.reviews.filter(
              ({ id }) => !find(previousResult.reviews, { id })
            )

            return {
              reviews: [...previousResult.reviews, ...newReviews],
            }
          },
        })
      }
    }
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return (
    <div className="Reviews-content">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
      <div className="Spinner" />
    </div>
  )
}
