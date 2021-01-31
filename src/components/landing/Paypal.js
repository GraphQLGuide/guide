import React from 'react'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import './Paypal.css'
import { getPackage, calculateTeamPrice } from '../../lib/packages'
import CurrentUser from '../CurrentUser'
import Emoji from './Emoji'
import LinkNewTab from './LinkNewTab'

const Paypal = ({ user, login, loading, location, match }) => {
  const packageInfo =
    get(location, 'state.packageInfo') ||
    getPackage(match.params.package || 'full')

  let { key, name, price } = packageInfo

  if (key === 'team') {
    price = calculateTeamPrice(location.state.licenses)
  }

  return (
    <main className="Paypal">
      <div className="Paypal-content">
        <p>
          <i>Package: {name}</i>
        </p>
        <p>
          <b>Step 1: </b>
          Send ${price} via PayPal, with your Github username in the payment
          note.
        </p>
        <p style={{ textAlign: 'center' }}>
          <LinkNewTab href={`https://www.paypal.me/graphqlguide/${price}`}>
            paypal.me/graphqlguide/
            {price}
          </LinkNewTab>
        </p>
        <div className="Paypal-step2">
          <b>Step 2: </b>
          Create an account:
          {user && <Emoji name="white_check_mark" />}
          <div className="Paypal-login">
            <CurrentUser
              user={user}
              login={login}
              loading={loading}
              buttonText="Sign up"
              inline
            />
          </div>
        </div>
        <p>
          <b>Step 3: </b>
          Within a day or two, we’ll manually add the package you bought to your
          user record in the database.
        </p>
      </div>
    </main>
  )
}

export default withRouter(Paypal)
