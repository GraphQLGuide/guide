import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'
import Odometer from 'react-odometerjs'

const StarCount = ({ githubStars, loading }) => {
  return (
    <a
      className={classNames('StarCount', { loading })}
      href="https://github.com/GraphQLGuide/guide"
    >
      {githubStars && <Odometer value={githubStars} />}
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
  <Query query={STARS_QUERY} pollInterval={5 * 1000}>
    {({ data: { githubStars }, loading }) => (
      <StarCount githubStars={githubStars} loading={loading} />
    )}
  </Query>
)
