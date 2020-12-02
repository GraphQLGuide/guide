import React from 'react'
import { screen } from '@testing-library/react'

import Section from './Section'

describe('Section', () => {
  it('should render loading status', async () => {
    render(
      <ApolloLoadingProvider>
        <Section />
      </ApolloLoadingProvider>
    )

    screen.getByRole('status')
    await wait()
    screen.getByRole('status')
  })
})
