import ApolloClient, { createNetworkInterface } from 'apollo-client'

let apolloClient = null

function createClient (headers) {
  return new ApolloClient({
    ssrMode: !process.browser,
    headers,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:3000/graphql',
      opts: {
        credentials: 'same-origin',
      },
    }),
  })
}

export const initClient = (headers) => {
  if (!process.browser) {
    return createClient(headers)
  }
  if (!apolloClient) {
    apolloClient = createClient(headers)
  }
  return apolloClient
}
