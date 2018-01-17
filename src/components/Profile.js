import React from 'react'
import PropTypes from 'prop-types'

const Profile = ({ user, login, logout, loading }) => {
  if (loading) {
    return (
      <main className="Profile">
        <div className="Spinner" />
      </main>
    )
  } else if (!user) {
    return (
      <main className="Profile">
        <button onClick={login}>Sign in</button>
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
              <a href="https://github.com/settings/applications">
                <code>{user.username}</code>
              </a>
            </dd>
          </dl>

          <button className="Profile-logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </main>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    hasPurchased: PropTypes.string
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Profile
