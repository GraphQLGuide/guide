import express from 'express'
import next from 'next'

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'

import typeDefs from './data/schema'
import resolvers from './data/resolvers'

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()
const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

app.prepare()
.then(() => {
  const server = express()

  server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: executableSchema,
  }))

  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }))

  server.get('*', (req, res) => {
    global.navigator = global.navigator || {}
    global.navigator.userAgent = req.headers['user-agent'] || 'all'
    return handle(req, res)
  })

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`) // eslint-disable-line
  })
})
