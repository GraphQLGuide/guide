import React from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

import { deslugify } from '../lib/helpers'

const Section = ({ loading, section, chapter }) => {
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
        </span>
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

Section.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number,
    content: PropTypes.string
  }).isRequired,
  chapter: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  }).isRequired,
  loading: PropTypes.bool.isRequired
}

const SECTION_BY_ID_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      content
    }
  }
`

const withSectionById = graphql(SECTION_BY_ID_QUERY, {
  skip: ({ location }) => !location.state,
  options: ({ location: { state } }) => ({
    variables: { id: state && state.section.id }
  }),
  props: ({
    ownProps: { location: { state } },
    data: { section, loading }
  }) => ({
    section: {
      ...state.section,
      content: section && section.content
    },
    chapter: state.chapter,
    loading
  })
})

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

const withSectionByChapterTitle = graphql(SECTION_BY_CHAPTER_TITLE_QUERY, {
  skip: ({ location }) =>
    location.state || !deslugify(location.pathname).chapterTitle,
  options: ({ location: { pathname } }) => ({
    variables: { title: deslugify(pathname).chapterTitle }
  }),
  props: ({ data: { chapterByTitle, loading } }) => ({
    section: chapterByTitle && chapterByTitle.section,
    chapter: {
      ...chapterByTitle,
      number: null
    },
    loading
  })
})

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

const withSectionByNumber = graphql(SECTION_BY_NUMBER_QUERY, {
  skip: ({ location }) =>
    location.state || !deslugify(location.pathname).chapterNumber,
  options: ({ location: { pathname } }) => ({ variables: deslugify(pathname) }),
  props: ({ data: { chapterByNumber, loading } }) => ({
    section: chapterByNumber && chapterByNumber.section,
    chapter: chapterByNumber,
    loading
  })
})

export default compose(
  withRouter,
  withSectionById,
  withSectionByChapterTitle,
  withSectionByNumber
)(Section)
