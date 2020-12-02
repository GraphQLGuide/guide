import React from 'react'
import {
  createApolloErrorProvider,
  createApolloMockedProvider,
  createApolloLoadingProvider,
} from 'apollo-mocked-provider'
import { ApolloLink } from '@apollo/client'
import { printSchema, buildClientSchema } from 'graphql'
import fs from 'fs'
import { render, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

const responseLogger = new ApolloLink((operation, forward) => {
  return forward(operation).map((result) => {
    console.log(JSON.stringify(result, null, '  '))
    return result
  })
})

const schema = JSON.parse(fs.readFileSync('schema.json'))
const typeDefs = printSchema(buildClientSchema(schema.data))
const ApolloMockedProvider = createApolloMockedProvider(typeDefs, {
  links: () => [responseLogger],
})

global.ApolloMockedProvider = ApolloMockedProvider
global.ApolloErrorProvider = createApolloErrorProvider()
global.ApolloLoadingProvider = createApolloLoadingProvider()

const RouterWrapper = ({ children }) => {
  const history = createMemoryHistory()

  return <Router history={history}>{children}</Router>
}

global.render = (ui, options) =>
  render(ui, { wrapper: RouterWrapper, ...options })

global.mockedRender = (ui, customResolvers, options) => {
  let id = 1

  const MockedWrapper = ({ children }) => (
    <RouterWrapper>
      <ApolloMockedProvider
        customResolvers={{
          Section: () => ({
            id: id++,
            number: id++,
          }),
          ObjID: () => id++,
          ...customResolvers,
        }}
      >
        {children}
      </ApolloMockedProvider>
    </RouterWrapper>
  )

  return render(ui, { wrapper: MockedWrapper, ...options })
}

global.wait = () => waitFor(() => {})
