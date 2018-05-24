import React, { Component } from 'react'

import Pitch from './Pitch'
import Authors from './Authors'
import LandingToC from './LandingToC'
import Pricing from './Pricing'
import Links from './Links'

class BelowFold extends Component {
  render() {
    return (
      <div className="BelowFold">
        <Authors />
        <Pitch />
        <LandingToC />
        <Pricing />
        <Links />
      </div>
    )
  }
}

export default BelowFold
