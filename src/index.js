import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import { apollo } from './lib/apollo'

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apollo}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()

module.hot.accept()
