import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'
import Odometer from 'react-odometerjs'

class StarCount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.subscribeToMore({
      document: STARS_SUBSCRIPTION,
      updateQuery: (
        previousResult,
        { subscriptionData: { data: { githubStars } } }
      ) => ({ githubStars })
    })
  }

  render() {
    const { githubStars, loading } = this.props

    return (
      <a
        className={classNames('StarCount', { loading })}
        href="https://github.com/GraphQLGuide/guide"
      >
        {githubStars && <Odometer value={githubStars} />}
      </a>
    )
  }
}

StarCount.propTypes = {
  githubStars: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  subscribeToMore: PropTypes.func
}

const STARS_QUERY = gql`
  query StarsQuery {
    githubStars
  }
`

const STARS_SUBSCRIPTION = gql`
  subscription StarsSubscription {
    githubStars
  }
`

const withData = graphql(STARS_QUERY, {
  props: ({ data: { githubStars, loading, subscribeToMore } }) => ({
    githubStars,
    loading,
    subscribeToMore
  })
})

export default withData(StarCount)
