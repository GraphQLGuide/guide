import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { CachePersistor } from 'apollo-cache-persist'

import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'
import CurrentUser from './CurrentUser'
import Profile from './Profile'
import Reviews from './Reviews'
import CurrentTemperature from './CurrentTemperature'
import { cache, apollo } from '../lib/apollo'

const Book = ({ user }) => (
  <div>
    <TableOfContents />
    <Switch>
      <Route exact path="/reviews" render={() => <Reviews user={user} />} />
      <Route component={Section} />
    </Switch>
  </div>
)

const persistor = new CachePersistor({
  cache,
  storage: window.localStorage,
  maxSize: 4500000, // little less than 5 MB
  debug: true
})

apollo.onResetStore(() => persistor.purge())

const cacheHasBeenSaved = !!localStorage.getItem('apollo-cache-persist')

class App extends Component {
  state = {
    loading: cacheHasBeenSaved
  }

  async componentDidMount() {
    await persistor.restore()

    this.setState({
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
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
  }
}

export default App
