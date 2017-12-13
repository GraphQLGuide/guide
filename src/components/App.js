import React, { Component } from 'react'
import logo from '../logo.svg'
import StarCount from './StarCount'
import TableOfContents from './TableOfContents'
import Section from './Section'

class App extends Component {
  render() {
    return (
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
  }
}

export default App
