import React from 'react'
import { renderToString } from 'react-dom/server'

// import App from '../src/components/App'
// ^ this would result in errors, so we make a small example App:
const App = () => <b>My server-rendered React app</b>

export default (req, res) => {
  res.status(200).send(`
  <!doctype html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>The GraphQL Guide</title>
  </head>

  <body>
    <div id="root">
      ${renderToString(<App />)}
    </div>
  </body>

  </html>
`)
}
