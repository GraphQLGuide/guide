import React, { Component } from 'react'

import Emoji from './emoji'

const BookLI = ({ children }) => {
  return (
    <li
      style={{
        listStyle: 'none',
        marginBottom: 10,
      }}
      >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
        <Emoji name="white_check_mark" />
        { /* <Emoji name="heavy_check_mark" /> */ }
        <span
          style={{
            marginLeft: 15,
          }}
          >
          {children}
        </span>
      </span>
    </li>
  )
}

BookLI.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default BookLI
