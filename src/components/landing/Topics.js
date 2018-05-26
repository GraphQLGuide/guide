import React from 'react'
import Typography from 'material-ui/Typography'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChalkboardTeacher from '@fortawesome/fontawesome-free-solid/faChalkboardTeacher'
import faGraduationCap from '@fortawesome/fontawesome-free-solid/faGraduationCap'
import faDesktop from '@fortawesome/fontawesome-free-solid/faDesktop'
import faServer from '@fortawesome/fontawesome-free-solid/faServer'
import faReact from '@fortawesome/fontawesome-free-brands/faReact'
import faVuejs from '@fortawesome/fontawesome-free-brands/faVuejs'
import faAppStoreIos from '@fortawesome/fontawesome-free-brands/faAppStoreIos'
import faAndroid from '@fortawesome/fontawesome-free-brands/faAndroid'

import './Topics.css'

const topics = [
  {
    icon: faChalkboardTeacher,
    title: 'Beginner introduction',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faGraduationCap,
    title: 'Advanced topics',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faDesktop,
    title: 'Frontend',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faServer,
    title: 'Backend',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faReact,
    title: 'React',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faVuejs,
    title: 'Vue',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faAppStoreIos,
    title: 'iOS',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    icon: faAndroid,
    title: 'Android',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
]

const Topic = ({ icon, title, text }) => (
  <div className="Topic">
    <FontAwesomeIcon icon={icon} />
    <Typography className="Topic-title" variant="headline">
      {title}
    </Typography>
    <hr />
    <div className="Topic-caption">{text}</div>
  </div>
)

const Topics = () => (
  <section className="Topics">
    <Typography className="Topics-header" variant="display2" component="h1">
      Topics We Cover
    </Typography>

    <div className="Topics-list">
      {topics.map((topic, i) => <Topic {...topic} key={i} />)}
    </div>
  </section>
)

export default Topics
