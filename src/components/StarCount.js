import React from 'react'
import { gql, useQuery } from '@apollo/client'

const STARS_QUERY = gql`
  query StarsQuery {
    githubStars
  }
`

export default () => {
  const { data } = useQuery(STARS_QUERY)

  return (
    <a
      className="StarCount"
      href="https://github.com/GraphQLGuide/guide"
      target="_blank"
      rel="noopener noreferrer"
    >
      {data && data.githubStars}
    </a>
  )
}
