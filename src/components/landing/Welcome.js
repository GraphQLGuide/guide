import React, { Component } from 'react'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'

import './Welcome.css'
import { getPackage } from '../../lib/packages'
import Emoji from './Emoji'
import CurrentUser from '../CurrentUser'

class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = { offerTshirt: null }
  }

  static getDerivedStateFromProps({ user }) {
    if (!user) {
      return { offerTshirt: false }
    }

    const hasTshirtPackage = getPackage(user.hasPurchased).includesTshirt,
      declinedTshirt = localStorage.getItem('declinedTshirt')

    return {
      offerTshirt: hasTshirtPackage && !declinedTshirt
    }
  }

  declineTshirt = () => {
    localStorage.setItem('declinedTshirt', true)
    this.setState({ offerTshirt: false })
  }

  render() {
    const { user } = this.props
    const loggedIn = !!user

    return (
      <section className="Welcome">
        <ScrollToTopOnMount />
        <Typography variant="display3">Welcome!</Typography>
        <p>
          Thank you for supporting the Guide <Emoji name="smiley" />
        </p>
        {loggedIn || (
          <p>
            To receive the book, please create an account through GitHub OAuth:
          </p>
        )}
        <CurrentUser {...this.props} buttonText="Create account" inline />
        {loggedIn && (
          <div className="Welcome-user">
            <Emoji name="white_check_mark" /> Account created.
            <p>
              We're emailing you at {user.email} with the latest version of the
              book.
            </p>
            {user.hasPurchased === 'TEAM' && (
              <p>
                We're also sending an email explaining how to use your team
                license.
              </p>
            )}
            {this.state.offerTshirt && (
              <div className="Welcome-tshirt">
                Would you like a tshirt?
                <Link to="/tshirt">Yes</Link>
                <button onClick={this.declineTshirt}>No thanks</button>
              </div>
            )}
          </div>
        )}
      </section>
    )
  }
}

export default Welcome
