import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'
import CurrentUser from './CurrentUser'
import Profile from './Profile'
import Reviews from './Reviews'
import CurrentTemperature from './CurrentTemperature'

const Book = ({ user }) => (
  <div>
    <TableOfContents />
    <Switch>
      <Route exact path="/reviews" render={() => <Reviews user={user} />} />
      <Route component={Section} />
    </Switch>
  </div>
)

export default () => (
  <div className="App">
    <header className="App-header">
      <StarCount />
      <Link className="App-home-link" to="/">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">The GraphQL Guide</h1>
      </Link>
      <CurrentUser />
      <CurrentTemperature />
    </header>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/Preface" />} />
      <Route exact path="/me" component={Profile} />
      <Route component={Book} />
    </Switch>
  </div>
)
