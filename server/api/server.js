import React from 'react'
import { renderToString } from 'react-dom/server'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import fetch from 'cross-fetch'
import { getDataFromTree } from '@apollo/client/react/ssr'

import ReviewList from '../src/components/ReviewList'

const apollo = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.graphql.guide/graphql',
    fetch,
  }),
  ssrMode: true,
  cache: new InMemoryCache(),
})

// import App from '../src/components/App'
// ^ this would result in errors, so we make a small example App:
const App = () => (
  <ApolloProvider client={apollo}>
    <h1>Reviews:</h1>
    <ReviewList orderBy="createdAt_DESC" />
  </ApolloProvider>
)

export default (req, res) => {
  getDataFromTree(<App />).then((content) => {
    const appHtml = renderToString(
      <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
    )
    const initialState = apollo.extract()

    res.status(200).send(`
      <!doctype html>
      <html lang="en">

      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>The GraphQL Guide</title>
      </head>

      <body>
        ${appHtml}
        <script>
          window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
            /</g,
            '\\u003c'
          )}
        </script>
      </body>

      </html>
    `)
  })
}
