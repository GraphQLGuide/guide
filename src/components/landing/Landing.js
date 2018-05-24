import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './global.css'
import './Landing.css'
import AboveFold from './AboveFold'
import BelowFold from './BelowFold'

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        {/* <header className="Landing-header">Sign in</header> */}
        <AboveFold />
        <BelowFold />
      </div>
    )
  }
}

Landing.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired
  }),
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default Landing
