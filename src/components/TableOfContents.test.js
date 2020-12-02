import React from 'react'
import { screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

import TableOfContents, { CHAPTER_QUERY } from './TableOfContents'

const mocks = [
  {
    request: { query: CHAPTER_QUERY },
    result: {
      data: {
        chapters: [
          {
            id: 1,
            number: 1,
            title: 'mocks-title',
            sections: [
              {
                id: '1',
                number: 1,
                title: 'Hello World',
              },
              {
                id: '2',
                number: 2,
                title: 'Hello World',
              },
            ],
          },
          {
            id: 2,
            number: 2,
            title: 'mocks-title',
            sections: [
              {
                id: '3',
                number: 3,
                title: 'Hello World',
              },
              {
                id: '4',
                number: 4,
                title: 'Hello World',
              },
            ],
          },
        ],
      },
    },
  },
]

describe('TableOfContents', () => {
  it('renders loading status and chapters', async () => {
    mockedRender(<TableOfContents />, {
      Chapter: () => ({
        title: () => 'Chapter-title',
      }),
    })

    screen.getByRole('status')
    await wait()
    screen.getAllByText('Chapter-title')
  })

  it('works with MockedProvider', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TableOfContents />
      </MockedProvider>
    )

    await wait()
    screen.getAllByText('mocks-title')
  })
})
