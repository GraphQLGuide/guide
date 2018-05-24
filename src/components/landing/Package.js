import React from 'react'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'

import './Package.css'
import { getPackage } from '../../lib/packages'
import Emoji from './Emoji'
import Payment from './Payment'

const Package = ({
  color,
  basic,
  pro,
  full,
  training,
  team,
  recommended,
  updatePeriod,
  extraChapters,
  videos,
  children
}) => {
  const packageInfo = getPackage({ basic, pro, full, training, team })
  const { price, name } = packageInfo

  let digits = ''
  if (price < 100) {
    digits = 'two-digits'
  } else if (price >= 1000) {
    digits = 'four-digits'
  }

  const features =
    training || team ? (
      <ul className="Package-features">{children}</ul>
    ) : (
      <ul className="Package-features">
        <li>The book in PDF, HTML, ePub, and Kindle formats</li>
        <li>The book's Git repositories, with branches for each section</li>
        <li>{updatePeriod}</li>
        {!basic && <li>Interactive exercises in-browser</li>}
        {!basic && <li>Course completion certificate</li>}
        {extraChapters && (
          <li>
            <div className={classNames('Package-feature-list', { full })}>
              {pro ? 'Extra chapters:' : 'More extra chapters:'}
            </div>
            {extraChapters.map(chapter => (
              <div className="Package-extra-item" key={chapter}>
                {chapter}
              </div>
            ))}
          </li>
        )}
        {videos && (
          <li>
            <div className={classNames('Package-feature-list', { full })}>
              {pro ? 'Videos:' : 'More videos:'}
            </div>
            {videos.map(video => (
              <div className="Package-extra-item" key={video}>
                {video}
              </div>
            ))}
          </li>
        )}
        {full && (
          <li>
            <b>Technical support</b> if you run into problems following along
            with the coding chapters
          </li>
        )}
        {full && (
          <li>
            Access to the Guide <b>Slack community</b>
          </li>
        )}
        {full && (
          <li>
            The Guide T-shirt!
            <Link to="/tshirt">
              <Image
                className="Package-tshirt"
                publicId="guide-tshirt"
                fetchFormat="auto"
                quality="auto"
              />
              T-shirt options
            </Link>
            <br />
            <br />
            Exclusively for Full edition readers.
            <br />
            Free worldwide shipping.
          </li>
        )}
      </ul>
    )

  return (
    <Paper
      className={classNames('Package', name.toLowerCase(), { recommended })}
      elevation={10}
    >
      <div className="Package-header">
        {recommended && (
          <div className="Package-recommendation">
            <Emoji name="ok_hand" />
            <Emoji name="point_down" />
            <Emoji name="ok_hand" />
          </div>
        )}
        <div className={`Package-header-bg ${color}`} />
        <Typography className="Package-name" variant="display1">
          {name}
        </Typography>
        <Typography className={`Package-price ${digits}`} variant="headline">
          {price}
        </Typography>
      </div>
      {features}
      <Payment packageInfo={packageInfo} />
    </Paper>
  )
}

export default Package
