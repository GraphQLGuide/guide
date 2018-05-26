import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { CloudinaryContext } from 'cloudinary-react'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import { apollo, inDevelopment } from './lib/apollo'

const PINK = '#df1797'

const theme = createMuiTheme({
  palette: { primary: { main: PINK } }
})

const history = createBrowserHistory()
history.listen(location => {
  window.analytics.page(location.pathname)
})

const render = Component => {
  ReactDOM.render(
    <Router history={history}>
      <ApolloProvider client={apollo}>
        <MuiThemeProvider theme={theme}>
          <CloudinaryContext cloudName="graphql">
            <Component />
          </CloudinaryContext>
        </MuiThemeProvider>
      </ApolloProvider>
    </Router>,
    document.getElementById('root')
  )
}

render(App)

registerServiceWorker()

inDevelopment &&
  module.hot.accept('./components/App', () => {
    render(App)
  })
