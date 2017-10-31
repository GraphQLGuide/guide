import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const StarCount = ({ githubStars, loading }) => {
  return (
    <a className="StarCount" href="https://github.com/GraphQLGuide/guide">
      {githubStars}
    </a>
  )
}

StarCount.propTypes = {
  githubStars: PropTypes.number,
  loading: PropTypes.bool.isRequired
}

const STARS_QUERY = gql`
  query StarsQuery {
    githubStars
  }
`

export default () => (
  <Query query={STARS_QUERY}>
    {({ data: { githubStars }, loading }) => (
      <StarCount githubStars={githubStars} loading={loading} />
    )}
  </Query>
)
