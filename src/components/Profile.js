import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { withUser } from '../lib/withUser'
import { login, logout } from '../lib/auth'
import { apolloSpace } from '../lib/apollo'

class Profile extends Component {
  state = {
    showLaunch: false
  }

  toggleLaunchVisibility = () => {
    this.setState({ showLaunch: !this.state.showLaunch })
  }

  render() {
    const { user, loggingIn } = this.props

    if (loggingIn) {
      return (
        <main className="Profile">
          <div className="Spinner" />
        </main>
      )
    } else if (!user) {
      return (
        <main className="Profile">
          <button onClick={login} className="Profile-login">
            Sign in
          </button>
        </main>
      )
    } else {
      return (
        <main className="Profile">
          <div className="Profile-header-wrapper">
            <header className="Profile-header">
              <h1>{user.name}</h1>
            </header>
          </div>
          <div className="Profile-content">
            <dl>
              <dt>Email</dt>
              <dd>
                <code>{user.email}</code>
              </dd>

              <dt>Membership level</dt>
              <dd>
                <code>{user.hasPurchased || 'GUEST'}</code>
              </dd>

              <dt>OAuth Github account</dt>
              <dd>
                <a
                  href="https://github.com/settings/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <code>{user.username}</code>
                </a>
              </dd>
            </dl>

            <button className="Profile-logout" onClick={logout}>
              Sign out
            </button>
          </div>

          <div className="Profile-footer">
            <button
              className="Profile-toggle-launch"
              onClick={this.toggleLaunchVisibility}
            >
              <span role="img" aria-label="rocket">
                🚀
              </span>
            </button>

            {this.state.showLaunch && (
              <Query
                query={LAUNCH_QUERY}
                fetchPolicy="cache-and-network"
                client={apolloSpace}
                onCompleted={() =>
                  window.scrollTo({ top: 1000, left: 0, behavior: 'smooth' })
                }
              >
                {({
                  data: {
                    launchNext: {
                      details,
                      launch_date_utc,
                      launch_site,
                      mission_name,
                      rocket
                    } = {}
                  }
                }) =>
                  details ? (
                    <div>
                      The next SpaceX launch will be:
                      <dl>
                        <dt>Date</dt>
                        <dd>
                          <code>{new Date(launch_date_utc).toString()}</code>
                        </dd>

                        <dt>Mission</dt>
                        <dd>
                          <code>{mission_name}</code>
                        </dd>

                        <dt>Rocket</dt>
                        <dd>
                          <code>{rocket.rocket_name}</code>
                        </dd>

                        <dt>Launch site</dt>
                        <dd>
                          <code>{launch_site.site_name}</code>
                        </dd>

                        <dt>Details</dt>
                        <dd className="-non-code">{details}</dd>
                      </dl>
                    </div>
                  ) : (
                    <div className="Spinner" />
                  )
                }
              </Query>
            )}
          </div>
        </main>
      )
    }
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    hasPurchased: PropTypes.string
  }),
  loggingIn: PropTypes.bool.isRequired
}

const LAUNCH_QUERY = gql`
  query LaunchQuery {
    launchNext {
      details
      launch_date_utc
      launch_site {
        site_name
      }
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`

export default withUser(Profile)
