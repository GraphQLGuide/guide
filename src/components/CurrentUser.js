import React from 'react'
import { Link } from 'react-router-dom'

import { useUser } from '../lib/useUser'
import { login } from '../lib/auth'

export default () => {
  const { user, loggingIn } = useUser()

  let content

  if (loggingIn) {
    content = <div className="Spinner" />
  } else if (!user) {
    content = <button onClick={login}>Sign in</button>
  } else {
    content = (
      <Link to="/me" className="User">
        <img src={user.photo} alt={user.firstName} />
        {user.firstName}
      </Link>
    )
  }

  return <div className="CurrentUser">{content}</div>
}
