import React from 'react'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import Skeleton from 'react-loading-skeleton'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import { slugify, withHyphens } from '../lib/helpers'
import { SECTION_BY_ID_QUERY } from './Section'

const LoadingSkeleton = () => (
  <div>
    <div className="sr-only" role="status">
      Loading...
    </div>
    <h1>
      <Skeleton />
    </h1>
    <Skeleton count={4} />
  </div>
)

export const CHAPTER_QUERY = gql`
  query ChapterQuery {
    chapters {
      id
      number
      title
      sections {
        id
        number
        title
      }
    }
  }
`

export default () => {
  const { data: { chapters } = {}, loading } = useQuery(CHAPTER_QUERY)
  const client = useApolloClient()

  return (
    <nav className="TableOfContents">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <ul className="TableOfContents-chapters">
          {chapters.map((chapter) => {
            const chapterIsNumbered = chapter.number !== null
            return (
              <li
                className={classNames({ numbered: chapterIsNumbered })}
                key={chapter.id}
              >
                <NavLink
                  to={{
                    pathname: slugify(chapter),
                    state: { chapter, section: chapter.sections[0] },
                  }}
                  className="TableOfContents-chapter-link"
                  activeClassName="active"
                  isActive={(_, location) => {
                    const rootPath = location.pathname.split('/')[1]
                    return rootPath.includes(withHyphens(chapter.title))
                  }}
                  onMouseOver={() =>
                    client.query({
                      query: SECTION_BY_ID_QUERY,
                      variables: {
                        id: chapter.sections[0].id,
                      },
                    })
                  }
                >
                  {chapterIsNumbered && (
                    <span className="TableOfContents-chapter-number">
                      {chapter.number}
                    </span>
                  )}
                  {chapter.title}
                </NavLink>
                {chapterIsNumbered && (
                  <ul className="TableOfContents-sections">
                    {chapter.sections.map((section) => (
                      <li key={section.number}>
                        <NavLink
                          to={{
                            pathname: slugify(chapter, section),
                            state: { chapter, section },
                          }}
                          className="TableOfContents-section-link"
                          activeClassName="active"
                          onMouseOver={() =>
                            client.query({
                              query: SECTION_BY_ID_QUERY,
                              variables: {
                                id: section.id,
                              },
                            })
                          }
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
          <li>
            <NavLink className="TableOfContents-reviews-link" to="/reviews">
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}
