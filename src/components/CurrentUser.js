import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withUser } from '../lib/withUser'
import { login } from '../lib/auth'

const CurrentUser = ({ user, loggingIn }) => {
  let content

  if (user) {
    content = (
      <Link to="/me" className="User">
        <img src={user.photo} alt={user.firstName} />
        {user.firstName}
      </Link>
    )
  } else if (loggingIn) {
    content = <div className="Spinner" />
  } else {
    content = <button onClick={login}>Sign in</button>
  }

  return <div className="CurrentUser">{content}</div>
}

CurrentUser.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  }),
  loggingIn: PropTypes.bool.isRequired
}

export default withUser(CurrentUser)
