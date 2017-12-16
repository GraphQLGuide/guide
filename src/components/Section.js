import React from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

const Section = ({
  loading,
  sectionContent,
  location: { state: { chapter, section } }
}) => (
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
      {loading ? <Skeleton count={7} /> : sectionContent}
    </div>
  </section>
)

Section.propTypes = {
  sectionContent: PropTypes.string,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

const SECTION_QUERY = gql`
  query SectionContent($id: String!) {
    section(id: $id) {
      content
    }
  }
`

const withData = graphql(SECTION_QUERY, {
  options: ({ location: { state: { section: { id } } } }) => ({
    variables: { id }
  }),
  props: ({ data: { section, loading } }) => ({
    sectionContent: section && section.content,
    loading
  })
})

export default withRouter(withData(Section))
