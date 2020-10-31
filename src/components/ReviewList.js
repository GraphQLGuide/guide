import React, { useEffect } from 'react'
import { useQuery, NetworkStatus } from '@apollo/client'
import throttle from 'lodash/throttle'

import Review from './Review'
import { REVIEWS_QUERY } from '../graphql/Review'

export default ({ orderBy }) => {
  const { data, fetchMore, networkStatus } = useQuery(REVIEWS_QUERY, {
    variables: { limit: 10, orderBy },
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
        const lastId = reviews[reviews.length - 1].id

        fetchMore({ variables: { after: lastId, orderBy } })
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
