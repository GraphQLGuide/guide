import { onError } from 'apollo-link-error'

const KNOWN_ERRORS = ['unauthorized', 'already-associated', 'order-failed']

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    return
  }

  if (graphQLErrors) {
    const unknownErrors = graphQLErrors.filter(
      error => !KNOWN_ERRORS.some(knownError => error.message.match(knownError))
    )

    if (unknownErrors.length) {
      alert('😳 An unexpected error occurred on the server')
      unknownErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`)
      )
    }
  }
})
