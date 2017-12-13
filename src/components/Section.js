import React from 'react'
import Skeleton from 'react-loading-skeleton'

const Section = ({ loading = true }) => (
  <section className="Section">
    <div className="Section-header-wrapper">
      <header className="Section-header">
        <h1>Title</h1>
        <h2>Subtitle</h2>
      </header>
    </div>
    <div className="Section-content">
      {loading ? <Skeleton count={7} /> : null}
    </div>
  </section>
)

export default Section
