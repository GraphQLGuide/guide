import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'
import CurrentUser from './CurrentUser'
import Profile from './Profile'
import withAuth from '../lib/withAuth'
import Reviews from './Reviews'

const Book = () => (
  <div>
    <TableOfContents />
    <Switch>
      <Route exact path="/reviews" component={Reviews} />
      <Route component={Section} />
    </Switch>
  </div>
)

class App extends Component {
  render() {
    const { logout, ...authProps } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <StarCount />
          <Link className="App-home-link" to="/">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">The GraphQL Guide</h1>
          </Link>
          <CurrentUser {...authProps} />
        </header>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/Preface" />} />
          <Route
            exact
            path="/me"
            render={() => <Profile logout={logout} {...authProps} />}
          />
          <Route component={Book} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default withAuth(App)
