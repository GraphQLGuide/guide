import React from 'react'
import { screen, fireEvent } from '@testing-library/react'

import Reviews from './Reviews'

describe('Reviews', () => {
  it('alerts when deleting', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    mockedRender(<Reviews />, {
      Mutation: () => ({
        removeReview: () => {
          throw new Error('unauthorized')
        },
      }),
    })

    await wait()
    fireEvent.click(screen.getAllByRole('button', { name: 'Open menu' })[0])
    await wait()
    fireEvent.click(screen.getAllByRole('menuitem', { name: 'Delete' })[0])
    await wait()
    fireEvent.click(screen.getAllByRole('button', { name: 'Sudo delete' })[0])
    await wait()
    expect(window.alert).toHaveBeenCalled()
  })
})
