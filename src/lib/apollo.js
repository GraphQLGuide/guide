import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { getAuthToken } from 'auth0-helpers'
import { errorLink } from './errorLink'
import find from 'lodash/find'

const httpLink = new HttpLink({
  uri: 'https://api.graphql.guide/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken({
    doLoginIfTokenExpired: true,
  })

  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  } else {
    return { headers }
  }
})

const authedHttpLink = authLink.concat(httpLink)

const wsLink = new WebSocketLink({
  uri: `wss://api.graphql.guide/subscriptions`,
  options: {
    reconnect: true,
  },
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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        reviews: {
          merge(existing = [], incoming, { readField }) {
            const notAlreadyInCache = (review) =>
              !find(
                existing,
                (existingReview) =>
                  readField('id', existingReview) === readField('id', review)
              )

            const newReviews = incoming.filter(notAlreadyInCache)

            return [...existing, ...newReviews]
          },
          keyArgs: false,
        },
      },
    },
  },
})

export const apollo = new ApolloClient({ link, cache })
