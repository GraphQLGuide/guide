import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useLocation } from 'react-router'
import get from 'lodash/get'
import pick from 'lodash/pick'

import { deslugify } from '../lib/helpers'

const SECTION_BY_ID_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      id
      content
      views
    }
  }
`

const SECTION_BY_CHAPTER_TITLE_QUERY = gql`
  query SectionByChapterTitle($title: String!) {
    chapterByTitle(title: $title) {
      title
      section(number: 1) {
        id
        content
        views
      }
    }
  }
`

const SECTION_BY_NUMBER_QUERY = gql`
  query SectionByNumber($chapterNumber: Int!, $sectionNumber: Int!) {
    chapterByNumber(number: $chapterNumber) {
      number
      section(number: $sectionNumber) {
        id
        number
        title
        content
        views
      }
    }
  }
`

const VIEWED_SECTION_MUTATION = gql`
  mutation ViewedSection($id: String!) {
    viewedSection(id: $id) {
      id
      views
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
        views: get(data, 'section.views'),
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

  const [viewedSection] = useMutation(VIEWED_SECTION_MUTATION)

  const id = get(section, 'id')

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      viewedSection({ variables: { id } })
    }, 2000)

    return () => clearTimeout(timeoutID)
  }, [id, viewedSection])

  let headerContent = null,
    sectionContent = null,
    footerContent = null

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
    footerContent = `Viewed ${section.views.toLocaleString()} times`
  }

  return (
    <section className="Section">
      <div className="Section-header-wrapper">
        <header className="Section-header">{headerContent}</header>
      </div>
      <div className="Section-content">{sectionContent}</div>
      <footer>{footerContent}</footer>
    </section>
  )
}
