import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default () => {
  const loading = true

  return (
    <section className="Section">
      <div className="Section-header-wrapper">
        <header className="Section-header">
          <h1>Title</h1>
          <h2>Subtitle</h2>
        </header>
      </div>
      <div className="Section-content">{loading && <Skeleton count={7} />}</div>
    </section>
  )
}
