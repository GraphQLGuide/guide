import React from 'react'
import Typography from 'material-ui/Typography'

import './Authors.css'
import Author from './Author'
import Emoji from './Emoji'
import LinkNewTab from './LinkNewTab'

const Authors = () => (
  <section className="Authors">
    <Typography className="Authors-header" variant="display2" component="h1">
      <Emoji name="nerd" />
      The Authors
      <Emoji name="nerd" />
    </Typography>
    <div className="Authors-list">
      <Author
        name="John Resig"
        twitter="jeresig"
        avatar="//pbs.twimg.com/profile_images/709460796259041281/TE5YLrp6_400x400.jpg"
      >
        John is a JavaScript expert. He created jQuery and works as the Dean of
        Computer Science at Khan Academy. Seven years ago, he stepped back from
        jQuery and wrote his last book. Now, he's coming back out to take
        GraphQL mainstream
        <Emoji name="smile" />
      </Author>

      <Author
        name="Loren Sands-Ramshaw"
        twitter="lorendsr"
        avatar="//res.cloudinary.com/graphql/loren.png"
      >
        Loren is a <LinkNewTab href="http://lorensr.me">freelancer</LinkNewTab>{' '}
        who loves teaching and writing. He has worked on Apollo and The Meteor
        Guide, coded full-stack web and mobile apps for eight years, founded
        startups, and TA'ed Computer Science courses at Dartmouth.
      </Author>
    </div>
  </section>
)

export default Authors
