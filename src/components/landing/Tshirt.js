import React from 'react'
import { withRouter } from 'react-router'
import { Image } from 'cloudinary-react'

import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

import './Tshirt.css'
import LoadStripe, { stripeCheckout } from '../../lib/payment'
import { getPackage } from '../../lib/packages'
import images from '../../lib/images'
import LinkNewTab from './LinkNewTab'
import ScrollToTopOnMount from './ScrollToTopOnMount'
import TshirtOrderForm from './TshirtOrderForm'

const LinkedShirt = ({ filename }) => {
  const imageUrl = images.url(filename)

  return (
    <LinkNewTab href={imageUrl}>
      <Image
        className="Tshirt-image"
        publicId={filename}
        fetchFormat="auto"
        quality="auto"
      />
    </LinkNewTab>
  )
}

const Tshirt = ({ user, login, history }) => {
  const hasTshirtPackage = user && getPackage(user.hasPurchased).includesTshirt

  let action = (
    <Paper className="Tshirt-action" elevation={24}>
      <Typography variant="headline">Included with the Full edition</Typography>
      <LoadStripe>
        <Button
          className="Tshirt-buy"
          variant="raised"
          color="primary"
          onClick={() => stripeCheckout(getPackage('full'), history)}
        >
          Get it
        </Button>
      </LoadStripe>

      {user && !hasTshirtPackage ? (
        <div className="Tshirt-login">
          You currently have the {user.hasPurchased} package
        </div>
      ) : (
        <div className="Tshirt-login">
          <div>Already got it?</div>
          <button onClick={login}>Sign in</button>
        </div>
      )}
    </Paper>
  )

  if (user) {
    if (hasTshirtPackage) {
      if (user.tshirt) {
        action = (
          <Paper className="Tshirt-action" elevation={24}>
            <Typography variant="headline">T-shirt ordered</Typography>
            <br />
            {user.tshirt}
          </Paper>
        )
      } else {
        action = (
          <Paper className="Tshirt-action" elevation={24}>
            <Typography variant="headline">Order T-shirt</Typography>
            <TshirtOrderForm />
          </Paper>
        )
      }
    }
  }

  return (
    <section className="Tshirt">
      <ScrollToTopOnMount />
      <Typography className="Tshirt-title" variant="display3">
        The Guide T-Shirt
      </Typography>
      <div className="Tshirt-modeling">
        <LinkedShirt filename="tshirt-angled" />
        <LinkedShirt filename="guide-tshirt" />
        <LinkedShirt filename="tshirt-back" />
      </div>
      <Typography className="Tshirt-title" variant="display2">
        Your Options
      </Typography>
      <div className="Tshirt-options">
        <div className="Tshirt-option">
          <LinkedShirt filename="gray" />
          <Typography className="Tshirt-option-title" variant="display1">
            Gray
          </Typography>
          <ul className="Tshirt-features">
            <li>Dark gray heather</li>
            <li>52% combed/ring-spun cotton, 48% polyester</li>
            <li>Fabric weight: 4.2 oz</li>
            <li>Yarn diameter: 30 singles</li>
          </ul>
        </div>

        <div className="Tshirt-option">
          <LinkedShirt filename="navy" />
          <Typography className="Tshirt-option-title" variant="display1">
            Navy
          </Typography>
          <ul className="Tshirt-features">
            <li>Dark blue</li>
            <li>100% ring-spun cotton</li>
            <li>Fabric weight: 4.5 oz</li>
            <li>Yarn diameter: 30 singles</li>
          </ul>
        </div>

        <div className="Tshirt-option">
          <LinkedShirt filename="contoured" />
          <Typography className="Tshirt-option-title" variant="display1">
            Contoured
          </Typography>
          <ul>
            <li>Charcoal black</li>
            <li>50/25/25 polyester/cotton/rayon</li>
            <li>Fabric weight: 3.4 oz</li>
            <li>Yarn diameter: 40 singles</li>
          </ul>
        </div>
      </div>

      <div className="Tshirt-details">
        <div className="Tshirt-common-features">
          <Typography className="Tshirt-option-title" variant="display1">
            All Options Include
          </Typography>
          <ul>
            <li>Free worldwide shipping</li>
            <li>Tear-away labels</li>
            <li>Pre-shrunk</li>
          </ul>
        </div>

        {action}
      </div>
    </section>
  )
}

export default withRouter(Tshirt)
