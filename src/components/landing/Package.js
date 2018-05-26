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
        <li>
          <Typography className="Package-feature-header" variant="headline">
            Right now
          </Typography>
        </li>
        <li>Early access to the book in PDF, ePub, and Kindle formats</li>
        <hr />
        <li>The book's Git repositories, with branches for each section</li>
        {full && (
          <div>
            <hr />
            <li>
              <b>Technical support</b> if you run into problems following along
              with the coding chapters
            </li>
          </div>
        )}
        {full && (
          <div>
            <hr />
            <li>
              Access to the Guide <b>Slack community</b>
            </li>
          </div>
        )}
        {full && (
          <div>
            <hr />
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
          </div>
        )}
        <li>
          <Typography
            className="Package-feature-header -upon-completion"
            variant="headline"
          >
            Upon completion
          </Typography>
        </li>
        <li>The full book in ebook and HTML formats</li>
        {updatePeriod && (
          <div>
            <hr />
            <li>{updatePeriod}</li>
          </div>
        )}
        {!basic && (
          <div>
            <hr />
            <li>Interactive exercises in-browser</li>
          </div>
        )}
        {!basic && (
          <div>
            <hr />
            <li>Course completion certificate</li>
          </div>
        )}
        {extraChapters && (
          <div>
            <hr />
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
          </div>
        )}
        {videos && (
          <div>
            <hr />
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
          </div>
        )}
      </ul>
    )

  return (
    <Paper
      className={classNames('Package', color, name.toLowerCase(), {
        recommended
      })}
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
        <div className={`Package-header-bg`} />
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
