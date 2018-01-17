import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CurrentUser = ({ user, login, loading }) => {
  const User = () => (
    <Link to="/me" className="User">
      <img src={user.photo} alt={user.firstName} />
      {user.firstName}
    </Link>
  )

  let content

  if (user) {
    content = <User />
  } else if (loading) {
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
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default CurrentUser
