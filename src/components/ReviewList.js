import React, { useEffect } from 'react'
import { useQuery, NetworkStatus } from '@apollo/client'
import throttle from 'lodash/throttle'

import Review from './Review'
import { REVIEWS_QUERY } from '../graphql/Review'

export default () => {
  const { data, fetchMore, networkStatus } = useQuery(REVIEWS_QUERY, {
    variables: { skip: 0, limit: 10 },
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

      if (closeToBottom && reviews.length > 0) {
        fetchMore({ variables: { skip: reviews.length } })
      }
    }
  }, 100)

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
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
