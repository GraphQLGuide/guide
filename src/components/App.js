import React from 'react'

import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'

export default () => (
  <div className="App">
    <header className="App-header">
      <StarCount />
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">The GraphQL Guide</h1>
    </header>
    <TableOfContents />
    <Section />
  </div>
)
