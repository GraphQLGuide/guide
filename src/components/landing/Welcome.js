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

    this.state = {
      offerTshirt:
        getPackage(localStorage.getItem('package')).tshirt &&
        !localStorage.getItem('declinedTshirt')
    }
  }

  declineTshirt = () => {
    this.setState({ offerTshirt: false })
    localStorage.setItem('declinedTshirt', true)
  }

  render() {
    const loggedIn = !!this.props.user
    return (
      <section className="Welcome">
        <ScrollToTopOnMount />
        <Typography variant="display3">Welcome!</Typography>
        <p>
          Thank you for supporting the Guide <Emoji name="smiley" />
        </p>
        {loggedIn || <p>Please create an account through GitHub OAuth:</p>}
        <CurrentUser {...this.props} buttonText="Create account" inline />
        {loggedIn && (
          <div className="Welcome-user">
            <Emoji name="white_check_mark" /> Account created.
            <p>
              We're emailing you at {this.props.user.email} with the latest
              version of the book.
            </p>
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
