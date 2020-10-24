import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { getAuthToken } from 'auth0-helpers'
import find from 'lodash/find'

import { errorLink } from './errorLink'
import { countSentences } from './helpers'

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
          read(
            reviewRefs,
            { args: { orderBy, minStars, minSentences }, readField }
          ) {
            if (!reviewRefs) {
              return reviewRefs
            }

            const filtered = reviewRefs.filter((reviewRef) => {
              const stars = readField('stars', reviewRef),
                text = readField('text', reviewRef)
              return stars >= minStars && countSentences(text) >= minSentences
            })

            filtered.sort((reviewRefA, reviewRefB) => {
              const createdAtA = readField('createdAt', reviewRefA),
                createdAtB = readField('createdAt', reviewRefB)

              if (orderBy === 'createdAt_DESC') {
                return createdAtB - createdAtA
              } else {
                return createdAtA - createdAtB
              }
            })

            return filtered
          },
        },
      },
    },
  },
})

export const apollo = new ApolloClient({ link, cache })
