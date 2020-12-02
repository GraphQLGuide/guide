/* eslint-disable graphql/template-strings */

import React, { useEffect, useLayoutEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client'
import { useLocation } from 'react-router'
import get from 'lodash/get'
import pick from 'lodash/pick'
import debounce from 'lodash/debounce'

import { deslugify } from '../lib/helpers'
import { cache } from '../lib/apollo'

export const SECTION_BY_ID_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      id
      content
      views
      scrollY @client
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
        scrollY @client
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
        scrollY @client
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

const NEXT_SECTION_QUERY = gql`
  query NextSection($id: String!) {
    section(id: $id) {
      id
      next {
        id
        content
        views
        scrollY @client
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

  const { data } = useQuery(query, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  let section, chapter, loading

  // eslint-disable-next-line default-case
  switch (query) {
    case SECTION_BY_ID_QUERY:
      section = {
        ...state.section,
        content: get(data, 'section.content'),
        views: get(data, 'section.views'),
        scrollY: get(data, 'section.scrollY'),
      }
      chapter = state.chapter
      loading = !get(data, 'section')
      break
    case SECTION_BY_CHAPTER_TITLE_QUERY:
      section = get(data, 'chapterByTitle.section')
      chapter = {
        ...get(data, 'chapterByTitle'),
        number: null,
      }
      loading = !get(data, 'chapterByTitle')
      break
    case SECTION_BY_NUMBER_QUERY:
      section = get(data, 'chapterByNumber.section')
      chapter = get(data, 'chapterByNumber')
      loading = !get(data, 'chapterByNumber')
      break
  }

  const [viewedSection] = useMutation(VIEWED_SECTION_MUTATION)

  const id = get(section, 'id')

  const client = useApolloClient()

  useEffect(() => {
    if (!id) {
      return
    }

    client.query({
      query: NEXT_SECTION_QUERY,
      variables: { id },
    })
  }, [id, client])

  useEffect(() => {
    if (!id) {
      return
    }

    const timeoutID = setTimeout(() => {
      viewedSection({ variables: { id } })
    }, 1000)

    return () => clearTimeout(timeoutID)
  }, [id, viewedSection])

  const updateScrollY = debounce((scrollY) => {
    const scrollHasChangedSinceLastEvent = scrollY !== window.scrollY
    const scrollNeedsToBeUpdated = scrollY !== section.scrollY

    if (scrollHasChangedSinceLastEvent || !scrollNeedsToBeUpdated) {
      return
    }

    cache.writeFragment({
      id: `Section:${id}`,
      fragment: gql`
        fragment SectionScrollBy on Section {
          scrollY
        }
      `,
      data: {
        scrollY,
      },
    })
  }, 1000)

  useLayoutEffect(() => {
    const onScroll = () => updateScrollY(window.scrollY)

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateScrollY])

  const currentScrollY = get(section, 'scrollY')
  useLayoutEffect(() => {
    if (currentScrollY === undefined || currentScrollY === window.scrollY) {
      return
    }

    window.scrollTo(0, currentScrollY)
  }, [currentScrollY])

  let headerContent = null,
    sectionContent = null,
    footerContent = null

  if (loading) {
    headerContent = (
      <h1>
        <Skeleton />
      </h1>
    )
    sectionContent = (
      <div role="status">
        <Skeleton count={7} />
      </div>
    )
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
