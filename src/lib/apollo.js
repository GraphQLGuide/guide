import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { getAuthToken } from 'auth0-helpers'
import { withClientState } from 'apollo-link-state'
import { RestLink } from 'apollo-link-rest'

import { errorLink } from './errorLink'

const httpLink = createHttpLink({
  uri: 'https://api.graphql.guide/graphql'
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
  uri: `wss://api.graphql.guide/subscriptions`,
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

export const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      section: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Section', id })
    }
  }
})

const stateLink = withClientState({
  cache,
  defaults: {
    loginInProgress: false
  },
  typeDefs: `
    type Query {
      loginInProgress: Boolean
    }
    type Mutation {
      setSectionScroll(id: String!, scrollY: Int!): Boolean
    }
  `,
  resolvers: {
    Section: {
      scrollY: () => 0
    },
    Mutation: {
      setSectionScroll: (_, { id, scrollY }, { cache, getCacheKey }) => {
        const cacheKey = getCacheKey({ __typename: 'Section', id })
        cache.writeData({ id: cacheKey, data: { scrollY } })
        return true
      }
    }
  }
})

const restLink = new RestLink({
  uri: 'https://api.openweathermap.org/data/2.5/'
})

const link = ApolloLink.from([errorLink, stateLink, restLink, networkLink])

export const apollo = new ApolloClient({ link, cache })

export const apolloSpace = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    createHttpLink({
      uri: 'https://api.spacex.land/graphql'
    })
  ]),
  cache: new InMemoryCache()
})
