import React, { Component } from 'react'

import { init as initAnalytics } from '../lib/analytics/autotrack'

export default class Init extends Component {
  componentDidMount() {
    initAnalytics()
  }

  render() {
    return null
  }
}
