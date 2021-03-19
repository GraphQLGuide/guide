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
import { Image } from 'cloudinary-react'

import './Topics.css'

const topics = [
  {
    icon: faChalkboardTeacher,
    title: 'Beginner introduction',
    text:
      'We start out in Chapter 1 by introducing the basics of GraphQL in contrast to REST. Then in Chapters 2–4, we go through the whole GraphQL specification from its basic building blocks. We also have an extensive Background chapter that covers everything from JSON to databases to server-side rendering.',
  },
  {
    icon: faGraduationCap,
    title: 'Advanced topics',
    text:
      'In the client chapters, we cover topics like infinite scrolling, local state, prefetching, and persisting. In our server chapter, we cover schema design, four different data sources (as well as how to create your own), security, performance, and more.',
  },
  {
    icon: faDesktop,
    title: 'Frontend',
    text: `Chapters 5–10 are all about the client. You can make an HTTP request to a GraphQL API from anywhere, or you can use an advanced client library with automatic caching and view layer integration. We have chapters on React, Vue, React Native, iOS, and Android.`,
  },
  {
    icon: faServer,
    title: 'Backend',
    text: `If you’re a backend dev, we’ve got you covered. Chapter 11 is our longest chapter, and it goes through all the server topics you could want: server structure, connecting to databases and APIs, subscriptions, authentication, authorization, caching, testing, and more.`,
  },
  {
    icon: faReact,
    title: 'React',
    text:
      'React is becoming the lingua franca of modern web dev, so this is our longest client chapter. We go through everything in the Apollo Client library, including hooks, managing local state, subscriptions, optimistic updates, error handling, pagination, batching, linting, testing, and more.',
  },
  {
    icon: faVuejs,
    title: 'Vue',
    text:
      'Our Vue chapter teaches Apollo Vue’s composition API. Provide an ApolloClient instance and query inside a component’s setup function to get refs with the data, loading status, and error status. Query with variables and options, send mutations, and watch subscription results.',
  },
  {
    icon: faAppStoreIos,
    title: 'iOS',
    text: `In addition to our React Native chapter, we also have a native iOS chapter that uses the Apollo iOS Swift client. Get your query and mutation results in query-specific Swift types, and access an automatically managed cache of data that you’ve fetched previously.`,
  },
  {
    icon: faAndroid,
    title: 'Android',
    text:
      'In addition to our React Native chapter, we also have a native Android chapter based on the Apollo Android library. Get typed Kotlin models generated from your queries and mutations, configure caching, and use coroutines, ViewModel, and Flow.',
  },
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
  <section className="Topics" id="topics">
    <Typography className="Topics-header" variant="display2" component="h1">
      Topics We Cover
    </Typography>

    <div className="Topics-list">
      {topics.map((topic, i) => (
        <Topic {...topic} key={i} />
      ))}
    </div>

    <div className="Topics-reviews">
      <Image
        className="Topics-review"
        publicId="enno"
        fetchFormat="auto"
        quality="auto"
      />
      <Image
        className="Topics-review"
        publicId="glover"
        fetchFormat="auto"
        quality="auto"
      />
      {/* <Image
        className="Topics-review"
        publicId="malek"
        fetchFormat="auto"
        quality="auto"
      /> */}

      {/* todo link to /reviews */}
    </div>
  </section>
)

export default Topics
