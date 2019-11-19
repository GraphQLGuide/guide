import React from 'react'
import { Image } from 'cloudinary-react'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import scrollIntoView from 'scroll-into-view-if-needed'

import './AboveFold.css'
import LogoName from './LogoName'

const scrollTo = selector => () => {
  scrollIntoView(document.querySelector(selector), {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

const AboveFold = () => (
  <div className="AboveFold">
    <div className="AboveFold-container">
      <div className="AboveFold-main-container">
        <LogoName />
        <div className="AboveFold-main">
          <div className="AboveFold-text">
            <Typography className="AboveFold-title" variant="display3">
              GraphQL is the <span className="-nowrap">new REST</span>
            </Typography>
            <Typography className="AboveFold-subtitle" variant="body1">
              GraphQL is the best way to fetch data for your app, and The
              GraphQL Guide is the best way to learn how.
            </Typography>
          </div>
          <div className="AboveFold-buttons">
            <Button variant="raised" onClick={scrollTo('.BelowFold')}>
              Learn more
            </Button>
            <Button
              color="primary"
              variant="raised"
              onClick={scrollTo('.Pricing')}
            >
              Get the beta
            </Button>
          </div>
          <div className="AboveFold-format-list">
            <Typography variant="caption">
              * Beta chapters available in PDF, ePub, and Kindle.
            </Typography>
          </div>
        </div>
      </div>
    </div>
    <div className="AboveFold-hero-container">
      <Image
        className="AboveFold-hero"
        publicId="book"
        fetchFormat="auto"
        quality="auto"
      />
    </div>
  </div>
)

export default AboveFold
