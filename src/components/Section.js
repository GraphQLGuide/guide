import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { gql, useQuery } from '@apollo/client'
import { useLocation } from 'react-router'
import get from 'lodash/get'

const SECTION_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      content
    }
  }
`

export default () => {
  const {
    state: { section, chapter },
  } = useLocation()

  const { data, loading } = useQuery(SECTION_QUERY, {
    variables: { id: section.id },
  })

  return (
    <section className="Section">
      <div className="Section-header-wrapper">
        <header className="Section-header">
          {chapter.number !== null ? (
            <div>
              <h1>{section.title}</h1>
              <h2>
                {'Chapter ' + chapter.number}
                <span className="Section-number-divider" />
                {'Section ' + section.number}
              </h2>
            </div>
          ) : (
            <h1>{chapter.title}</h1>
          )}
        </header>
      </div>
      <div className="Section-content">
        {loading ? <Skeleton count={7} /> : get(data, 'section.content')}
      </div>
    </section>
  )
}
