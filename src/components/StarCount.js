import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const StarCount = ({ githubStars, loading }) => {
  return (
    <a className="StarCount" href="https://github.com/GraphQLGuide/guide">
      {githubStars} stars
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
const withData = graphql(STARS_QUERY, {
  props: ({ data: { githubStars, loading } }) => ({
    githubStars,
    loading
  })
})

export default withData(StarCount)
