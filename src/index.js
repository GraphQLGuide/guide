import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './components/App'
import { apollo } from './lib/apollo'

render(
  <BrowserRouter>
    <ApolloProvider client={apollo}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

module.hot.accept()
