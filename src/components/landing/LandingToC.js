import React from 'react'
import Typography from 'material-ui/Typography'

import './LandingToC.css'
import Emoji from './Emoji'

import chapters from '../../lib/chapters'
import sections from '../../lib/sections'

const LandingToC = () => (
  <section className="LandingToC">
    <Typography className="LandingToC-header" variant="display2" component="h1">
      <Emoji name="book" />
      Table of Contents
      <Emoji name="book" />
    </Typography>
    <div className="LandingToC-content">
      <ol className="LandingToC-chapters">
        {chapters.map(({ id, title, sectionless, nonNumbered }) => (
          <li className={nonNumbered && '-non-numbered'} key={id}>
            {nonNumbered || `${id}. `}
            {title}
            {sectionless || (
              <ol className="LandingToC-sections">
                {sections.map(
                  ({ id: sectionId, chapterId, title }) =>
                    id === chapterId && <li key={sectionId}>{title}</li>
                )}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </div>
    <footer>
      Contents subject to change during the beta. Currently published chapters
      are 1, 5, 6, and Background.
    </footer>
  </section>
)

export default LandingToC
