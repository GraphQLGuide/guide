import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { gql, useQuery } from '@apollo/client'
import { useLocation } from 'react-router'
import get from 'lodash/get'
import pick from 'lodash/pick'

import { deslugify } from '../lib/helpers'

const SECTION_BY_ID_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      content
    }
  }
`

const SECTION_BY_CHAPTER_TITLE_QUERY = gql`
  query SectionByChapterTitle($title: String!) {
    chapterByTitle(title: $title) {
      title
      section(number: 1) {
        content
      }
    }
  }
`

const SECTION_BY_NUMBER_QUERY = gql`
  query SectionByNumber($chapterNumber: Int!, $sectionNumber: Int!) {
    chapterByNumber(number: $chapterNumber) {
      number
      section(number: $sectionNumber) {
        number
        title
        content
      }
    }
  }
`

export default () => {
  const { state, pathname } = useLocation()

  const page = deslugify(pathname)

  let query, variables

  if (state) {
    query = SECTION_BY_ID_QUERY
    variables = { id: state.section.id }
  } else if (page.chapterTitle) {
    query = SECTION_BY_CHAPTER_TITLE_QUERY
    variables = { title: page.chapterTitle }
  } else {
    query = SECTION_BY_NUMBER_QUERY
    variables = pick(page, 'chapterNumber', 'sectionNumber')
  }

  const { data, loading } = useQuery(query, { variables })

  let section, chapter

  // eslint-disable-next-line default-case
  switch (query) {
    case SECTION_BY_ID_QUERY:
      section = {
        ...state.section,
        content: get(data, 'section.content'),
      }
      chapter = state.chapter
      break
    case SECTION_BY_CHAPTER_TITLE_QUERY:
      section = get(data, 'chapterByTitle.section')
      chapter = {
        ...get(data, 'chapterByTitle'),
        number: null,
      }
      break
    case SECTION_BY_NUMBER_QUERY:
      section = get(data, 'chapterByNumber.section')
      chapter = get(data, 'chapterByNumber')
      break
  }

  let headerContent = null,
    sectionContent = null

  if (loading) {
    headerContent = (
      <h1>
        <Skeleton />
      </h1>
    )
    sectionContent = <Skeleton count={7} />
  } else if (!section) {
    headerContent = (
      <h1>
        <span role="img" aria-label="magnifying glass">
          🔍
        </span>{' '}
        404 page not found
      </h1>
    )
  } else {
    if (chapter.number !== null) {
      headerContent = (
        <div>
          <h1>{section.title}</h1>
          <h2>
            {'Chapter ' + chapter.number}
            <span className="Section-number-divider" />
            {'Section ' + section.number}
          </h2>
        </div>
      )
    } else {
      headerContent = <h1>{chapter.title}</h1>
    }

    sectionContent = section.content
  }

  return (
    <section className="Section">
      <div className="Section-header-wrapper">
        <header className="Section-header">{headerContent}</header>
      </div>
      <div className="Section-content">{sectionContent}</div>
    </section>
  )
}
