import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { fontFamily, color, white } from './styles'

// overwrite anything in:
// https://github.com/callemall/material-ui/blob/master/src/styles/baseThemes/lightBaseTheme.js
const muiTheme = getMuiTheme({
  fontFamily,
  palette: {
    primary1Color: color,
    alternateTextColor: white,
    canvasColor: white,
  },
})

export default muiTheme
