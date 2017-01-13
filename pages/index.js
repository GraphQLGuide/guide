import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import Email from '../components/email'

class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      // height: 100,
      // width: 100,
      padding: 20,
      // textAlign: 'center',
      display: 'inline-block',
    }
    return (
      <MuiThemeProvider>
        <Paper style={style} zDepth={2} circle>
          <h2>
            Coming soon
          </h2>
          <form>
            <Email className="form-control" />
            <RaisedButton label="Notify me" primary type="submit" />
          </form>
        </Paper>
      </MuiThemeProvider>
    )
  }
}
export default Index
