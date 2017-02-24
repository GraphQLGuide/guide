import React, { Component } from 'react'
import stylePropType from 'react-style-proptype'

import Emoji from './emoji'

const BookLI = ({ style, children }) => {
  return (
    <li
      style={{
        listStyle: 'none',
        marginBottom: 10,
        ...style,
      }}
      className="hvr-grow-shadow"
      >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
        <Emoji
          name="white_check_mark"
          />
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
  style: stylePropType,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]).isRequired,
}

BookLI.defaultProps = {
  style: {},
}

export default BookLI
