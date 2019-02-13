import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import { ApolloClient } from 'apollo-client'

import { deslugify } from '../lib/helpers'

class Section extends Component {
  onSectionChange = newId => {
    this.viewedSection(newId)
    this.updateScrollPosition()
    this.prefetchNextSection(newId)
  }

  prefetchNextSection = currentId => {
    this.props.client.query({
      query: NEXT_SECTION_QUERY,
      variables: {
        id: currentId
      }
    })
  }

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

  updateScrollPosition = () => {
    window.scrollTo(0, this.props.section.scrollY)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)

    if (this.props.section) {
      this.onSectionChange(this.props.section.id)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce(() => {
    if (this.props.section.scrollY === window.scrollY) {
      return
    }

    this.props.setScrollPosition({
      variables: {
        id: this.props.section.id,
        scrollY: window.scrollY
      }
    })
  }, 1000)

  componentDidUpdate(prevProps) {
    if (!this.props.section) {
      return
    }

    const { id } = this.props.section
    const sectionChanged = get(prevProps, 'section.id') !== id

    if (sectionChanged) {
      this.onSectionChange(id)
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
    views: PropTypes.number,
    scrollY: PropTypes.number
  }),
  chapter: PropTypes.shape({
    title: PropTypes.string,
    number: PropTypes.number
  }),
  loading: PropTypes.bool.isRequired,
  viewedSection: PropTypes.func.isRequired,
  setScrollPosition: PropTypes.func.isRequired,
  client: PropTypes.instanceOf(ApolloClient).isRequired
}

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

const SET_SECTION_SCROLL_MUTATION = gql`
  mutation SetSectionScroll($id: String!, $scrollY: Int!) {
    setSectionScroll(id: $id, scrollY: $scrollY) @client
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
        views: get(data, 'section.views'),
        scrollY: get(data, 'section.scrollY')
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
            <Mutation mutation={SET_SECTION_SCROLL_MUTATION}>
              {setScrollPosition => (
                <Section
                  {...createProps(queryInfo)}
                  client={queryInfo.client}
                  viewedSection={viewedSection}
                  setScrollPosition={setScrollPosition}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  )
}

export default withRouter(SectionWithData)
