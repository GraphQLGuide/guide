import ApolloClient, { createNetworkInterface } from 'apollo-client'

let apolloClient

function createClient(headers) {
  return new ApolloClient({
    ssrMode: !process.browser,
    headers,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      uri: '/graphql',
      opts: {
        credentials: 'same-origin',
      },
    }),
  })
}

export default (headers) => {
  if (!process.browser) {
    return createClient(headers)
  }
  if (!apolloClient) {
    apolloClient = createClient(headers)
  }
  return apolloClient
}
