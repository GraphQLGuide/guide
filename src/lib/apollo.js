import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { getAuthToken } from 'auth0-helpers'
import { getMainDefinition } from 'apollo-utilities'

import { errorLink } from './errorLink'

export const inDevelopment = process.env.NODE_ENV !== 'production'

const httpLink = createHttpLink({
  uri: inDevelopment
    ? `http://${window.location.hostname}:4000/graphql`
    : 'https://api.graphql.guide/graphql'
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken({
    doLoginIfTokenExpired: true
  })

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }
  } else {
    return { headers }
  }
})

const authedHttpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: inDevelopment
    ? `ws://${window.location.hostname}:4000/subscriptions`
    : `wss://api.graphql.guide/subscriptions`,
  options: {
    reconnect: true
  }
})

const networkLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authedHttpLink
)

const link = errorLink.concat(networkLink)

const cache = new InMemoryCache()

export const apollo = new ApolloClient({ link, cache })
