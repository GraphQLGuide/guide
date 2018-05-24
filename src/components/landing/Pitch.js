import React from 'react'
import Typography from 'material-ui/Typography'

import './Pitch.css'
import Emoji from './Emoji'

const points = [
  'Beginner introduction',
  'Advanced topics',
  'Frontend',
  'Backend',
  'React',
  'Vue',
  'iOS',
  'Android'
]

const Pitch = () => (
  <section className="Pitch">
    <dl className="Pitch-graphql">
      <dt>
        <Typography className="Pitch-term" variant="headline">
          <Emoji name="right_pointing_magnifying_glass" />
          GraphQL&nbsp;(n):
        </Typography>
      </dt>
      <dd>
        <p>The best way to fetch data for your app.</p>
        <p>Get everything you want in one request.</p>
        <p>
          Any language. Any framework.
          {/* <Link to="/1-Understanding-GraphQL-through-REST/1-Introduction">
            more info
          </Link> */}
        </p>
      </dd>
    </dl>

    <Typography className="Pitch-header" variant="headline">
      <Emoji name="books" />
      The Complete Reference
      <Emoji name="books" />
    </Typography>
    <div className="Pitch-points">
      {points.map(point => (
        <div className="Pitch-point" key={point}>
          <Emoji name="white_check_mark" />
          {point}
        </div>
      ))}
    </div>
  </section>
)

export default Pitch
