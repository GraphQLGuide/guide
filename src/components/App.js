import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'

const Book = () => (
  <div>
    <TableOfContents />
    <Section />
  </div>
)

export default () => (
  <div className="App">
    <header className="App-header">
      <StarCount />
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">The GraphQL Guide</h1>
    </header>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/Preface" />} />
      <Route component={Book} />
    </Switch>
  </div>
)
