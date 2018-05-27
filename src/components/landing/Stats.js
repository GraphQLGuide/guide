import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFileAlt from '@fortawesome/fontawesome-free-solid/faFileAlt'
import faCode from '@fortawesome/fontawesome-free-solid/faCode'
import faBookOpen from '@fortawesome/fontawesome-free-solid/faBookOpen'
import faVideo from '@fortawesome/fontawesome-free-solid/faVideo'

import './Stats.css'

const Stats = () => (
  <section className="Stats">
    <div className="Stats-list">
      <div className="Stat">
        <FontAwesomeIcon icon={faFileAlt} />
        <h3 className="Stat-number -with-plus">350</h3>
        <div className="Stat-caption">Total pages</div>
      </div>
      <div className="Stat">
        <FontAwesomeIcon icon={faBookOpen} />
        <h3 className="Stat-number">12</h3>
        <div className="Stat-caption">Chapters</div>
      </div>
      <div className="Stat">
        <FontAwesomeIcon icon={faCode} />
        <h3 className="Stat-number -with-plus">10,000</h3>
        <div className="Stat-caption">Lines of code</div>
      </div>
      <div className="Stat">
        <FontAwesomeIcon icon={faVideo} />
        <h3 className="Stat-number">9</h3>
        <div className="Stat-caption">Videos</div>
      </div>
    </div>
  </section>
)

export default Stats
