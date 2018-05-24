import React from 'react'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import TwitterLogo from './TwitterLogo'
import LinkNewTab from './LinkNewTab'

const Author = ({ name, twitter, avatar, children }) => (
  <Paper className="Author" elevation={24}>
    <LinkNewTab
      className="Author-twitter"
      href={`https://twitter.com/${twitter}`}
    >
      <TwitterLogo />
      {twitter}
    </LinkNewTab>
    <Avatar className="Author-avatar" src={avatar} />
    <Typography className="Author-name" variant="headline">
      {name}
    </Typography>
    <div className="Author-description">{children}</div>
  </Paper>
)

export default Author
