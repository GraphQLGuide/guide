import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Landing from './landing/Landing'
import Paypal from './landing/Paypal'
import Unsubscribe from './Unsubscribe'
import Terms from './landing/Terms'
import Privacy from './landing/Privacy'
import Tshirt from './landing/Tshirt'
import Welcome from './landing/Welcome'
import Team from './landing/Team'
import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'
import CurrentUser from './CurrentUser'
import Profile from './Profile'
import withAuth from '../lib/withAuth'
import Reviews from './Reviews'

const Book = ({ user }) => (
  <div>
    <TableOfContents />
    <Switch>
      <Route exact path="/reviews" render={() => <Reviews user={user} />} />
      <Route component={Section} />
    </Switch>
  </div>
)

class App extends Component {
  render() {
    const { logout, ...authProps } = this.props

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Landing {...authProps} />} />
          <Route
            path="/paypal/:package?"
            render={() => <Paypal {...authProps} />}
          />
          <Route path="/unsubscribe/:token" render={() => <Unsubscribe />} />
          <Route
            exact
            path="/welcome"
            render={() => <Welcome {...authProps} />}
          />
          <Route
            exact
            path="/tshirt"
            render={() => <Tshirt {...authProps} />}
          />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/tshirt" component={Tshirt} />
          <Route
            render={() => (
              <div>
                <header className="App-header">
                  <StarCount />
                  <Link className="App-home-link" to="/Preface">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">The GraphQL Guide</h1>
                  </Link>
                  <CurrentUser {...authProps} />
                </header>
                <Switch>
                  {/* <Route exact path="/" render={() => <Redirect to="/Preface" />} /> */}
                  <Route
                    path="/team/:token"
                    render={({
                      match: {
                        params: { token },
                      },
                    }) => <Team {...authProps} urlToken={token} />}
                  />
                  <Route
                    exact
                    path="/me"
                    render={() => <Profile logout={logout} {...authProps} />}
                  />
                  <Route render={() => <Book user={this.props.user} />} />
                </Switch>
              </div>
            )}
          />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default withAuth(App)
