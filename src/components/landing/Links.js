import React from 'react'
import Footer from './Footer'
import Paper from 'material-ui/Paper'

import './Links.css'
import TwitterLogo from './TwitterLogo'
import MediumLogo from './MediumLogo'
import EmailIcon from './EmailIcon'
import LinkNewTab from './LinkNewTab'

const Links = () => (
  <div className="Links">
    <section className="Links-body">
      <LinkNewTab href="mailto:hi@graphql.guide">
        <Paper className="Links-paper">
          <EmailIcon />
          hi@graphql.guide
        </Paper>
      </LinkNewTab>
      <LinkNewTab href="https://twitter.com/graphqlguide">
        <Paper className="Links-paper">
          <TwitterLogo />
          @graphqlguide
        </Paper>
      </LinkNewTab>
      <LinkNewTab href="https://blog.graphql.guide/">
        <Paper className="Links-paper">
          <MediumLogo />
          Blog
        </Paper>
      </LinkNewTab>
    </section>

    <Footer />
  </div>
)

export default Links
