import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'
import Odometer from 'react-odometerjs'

class StarCount extends React.Component {
  componentDidMount() {
    this.props.subscribeToMore({
      document: STARS_SUBSCRIPTION,
      updateQuery: (
        previousResult,
        {
          subscriptionData: {
            data: { githubStars }
          }
        }
      ) => ({ githubStars })
    })
  }

  render() {
    const { githubStars, loading } = this.props

    return (
      <a
        className={classNames('StarCount', { loading })}
        href="https://github.com/GraphQLGuide/guide"
        target="_blank"
        rel="noopener noreferrer"
      >
        {githubStars && <Odometer value={githubStars} />}
      </a>
    )
  }
}

StarCount.propTypes = {
  githubStars: PropTypes.number,
  loading: PropTypes.bool.isRequired,
  subscribeToMore: PropTypes.func.isRequired
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

export default () => (
  <Query query={STARS_QUERY}>
    {({ data: { githubStars }, loading, subscribeToMore }) => (
      <StarCount
        githubStars={githubStars}
        loading={loading}
        subscribeToMore={subscribeToMore}
      />
    )}
  </Query>
)
