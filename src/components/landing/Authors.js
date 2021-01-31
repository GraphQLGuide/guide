import React from 'react'
import Typography from 'material-ui/Typography'

import './Authors.css'
import Author from './Author'

const Authors = () => (
  <section className="Authors" id="authors">
    <Typography className="Authors-header" variant="display2" component="h1">
      The Authors
    </Typography>
    <div className="Authors-list">
      <Author
        name="John Resig"
        twitter="jeresig"
        avatar="//res.cloudinary.com/graphql/jeresig.jpg"
      >
        John is a JavaScript expert. He created jQuery and is Chief Software
        Architect at Khan Academy. Eight years ago, he stepped back from jQuery
        and wrote his last book. He’s been exploring the power of GraphQL and is
        convinced that it’s the future of API development.
      </Author>

      <Author
        name="Loren Sands-Ramshaw"
        twitter="lorendsr"
        avatar="//res.cloudinary.com/graphql/loren.png"
      >
        Loren is a consultant who loves teaching and writing. He has worked on
        Apollo and the Meteor Guide, built full-stack web and mobile apps for
        over a decade, founded startups, and TA’ed many Computer Science courses
        at Dartmouth.
      </Author>
    </div>
  </section>
)

export default Authors
