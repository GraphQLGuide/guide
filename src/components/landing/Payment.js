import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Button from 'material-ui/Button'
import { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Typography from 'material-ui/Typography'

import './Payment.css'
import LoadStripe, { stripeCheckout } from '../../lib/payment'
import {
  BASE_LICENSES,
  calculateTeamPrice,
  formatTeamName
} from '../../lib/packages'

class Payment extends Component {
  state = {
    licenses: BASE_LICENSES
  }

  setLicenses = event => {
    this.setState({ licenses: event.target.value })
  }

  checkoutClicked = () => {
    const { packageInfo } = this.props
    let checkoutInfo = packageInfo

    if (packageInfo.team) {
      const { licenses } = this.state
      checkoutInfo = {
        ...packageInfo,
        price: calculateTeamPrice(licenses),
        name: formatTeamName(licenses),
        licenses
      }
    }

    stripeCheckout(checkoutInfo, this.props.history)
  }

  render() {
    const { packageInfo } = this.props
    return (
      <div className={`Payment ${packageInfo.key}`}>
        {packageInfo.team && (
          <FormControl className="Payment-licenses">
            <InputLabel htmlFor="select-licenses">License size</InputLabel>
            <Select
              native
              value={this.state.licenses}
              onChange={this.setLicenses}
              inputProps={{
                id: 'select-licenses'
              }}
            >
              {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map(n => (
                <option value={n} key={n}>
                  {n} seats – ${n / 5}k
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        <LoadStripe>
          <Button
            variant="raised"
            className="Payment-stripe"
            color={packageInfo.full && 'primary'}
            onClick={this.checkoutClicked}
          >
            GET THE BETA
          </Button>
        </LoadStripe>
        <Typography className="Payment-type" variant="caption">
          via Stripe Checkout
        </Typography>
        {/* <p>TODO or payment request api</p> */}
        {packageInfo.team ? (
          <div className="Payment-team">
            <p>
              You can also pay{' '}
              <Link
                to={{
                  pathname: '/paypal',
                  state: { packageInfo, licenses: this.state.licenses }
                }}
              >
                by PayPal
              </Link>
              <br />
              or by check to:
            </p>
            <p>
              The GraphQL Guide
              <br />
              2443 Fillmore St #380-2914
              <br />
              San Francisco, CA 94115
            </p>
          </div>
        ) : (
          <p>
            or manually{' '}
            <Link to={{ pathname: '/paypal', state: { packageInfo } }}>
              via PayPal
            </Link>
          </p>
        )}
      </div>
    )
  }
}

Payment.propTypes = {
  packageInfo: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired
}

export default withRouter(Payment)
