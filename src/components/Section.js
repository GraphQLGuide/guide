import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import { deslugify } from '../lib/helpers'

class Section extends Component {
  viewedSection = id => {
    if (!id) {
      return
    }

    setTimeout(() => {
      this.props.viewedSection({
        variables: { id }
      })
    }, 2000)
  }

  componentDidMount() {
    if (this.props.section) {
      this.viewedSection(this.props.section.id)
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.section
    const sectionChanged = get(prevProps, 'section.id') !== id

    if (sectionChanged) {
      this.viewedSection(id)
    }
  }

  render() {
    const { loading, section, chapter } = this.props
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
}

Section.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number,
    content: PropTypes.string,
    views: PropTypes.number
  }),
  chapter: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  }),
  loading: PropTypes.bool.isRequired,
  viewedSection: PropTypes.func.isRequired
}

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

const SectionWithData = ({ location: { state, pathname } }) => {
  const page = deslugify(pathname)

  let query, variables, createProps

  if (state) {
    query = SECTION_BY_ID_QUERY
    variables = { id: state.section.id }
    createProps = ({ data, loading }) => ({
      section: {
        ...state.section,
        content: get(data, 'section.content'),
        views: get(data, 'section.views')
      },
      chapter: state.chapter,
      loading
    })
  } else if (page.chapterTitle) {
    query = SECTION_BY_CHAPTER_TITLE_QUERY
    variables = { title: page.chapterTitle }
    createProps = ({ data, loading }) => ({
      section: get(data, 'chapterByTitle.section'),
      chapter: {
        ...data.chapterByTitle,
        number: null
      },
      loading
    })
  } else if (page.chapterNumber) {
    query = SECTION_BY_NUMBER_QUERY
    variables = page
    createProps = ({ data, loading }) => ({
      section: get(data, 'chapterByNumber.section'),
      chapter: data.chapterByNumber,
      loading
    })
  }

  return (
    <Query query={query} variables={variables}>
      {queryInfo => (
        <Mutation mutation={VIEWED_SECTION_MUTATION}>
          {viewedSection => (
            <Section
              {...createProps(queryInfo)}
              viewedSection={viewedSection}
            />
          )}
        </Mutation>
      )}
    </Query>
  )
}

export default withRouter(SectionWithData)
