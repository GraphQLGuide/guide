import React from 'react'
import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames'
import Odometer from 'react-odometerjs'

const STARS_QUERY = gql`
  query StarsQuery {
    githubStars
  }
`

export default () => {
  const { data, loading } = useQuery(STARS_QUERY, {
    pollInterval: 5 * 1000,
  })

  return (
    <a
      className={classNames('StarCount', { loading })}
      href="https://github.com/GraphQLGuide/guide"
      target="_blank"
      rel="noopener noreferrer"
    >
      {data && <Odometer value={data.githubStars} />}
    </a>
  )
}
