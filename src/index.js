import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import { apollo } from './lib/apollo'

const GRAPHQL_PINK = '#e10098'

const theme = createMuiTheme({
  palette: { primary: { main: GRAPHQL_PINK } }
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apollo}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()

module.hot.accept()
