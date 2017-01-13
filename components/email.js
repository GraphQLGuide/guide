/* eslint-disable */

// The MIT License (MIT)
//
// Copyright © 2016 Masoud Ghorbani <msud.ghorbani@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the “Software”), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

export default class Email extends Component {
  static propTypes = {
    className: React.PropTypes.string.isRequired,
    domains: React.PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    domains: ['yahoo.com', 'hotmail.com', 'gmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'googlemail.com', 'msn.com', 'hotmail.com', 'yahoo.com', 'facebook.com', 'verizon.net', 'outlook.com', 'icloud.com'], // Include important mail services
  }

  constructor(props) {
    super(props)
    this.state = {
      class: props.className,
      value: '',
      domains: props.domains,
      suggestion: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.getSuggest = this.getSuggest.bind(this)
  }

  getSuggest(event) {
    const protectedKeyCodes = [9, 17, 18, 35, 36, 37, 38, 39, 40, 45];
    if (protectedKeyCodes.indexOf(event.keyCode) >= 0) {
      return;
    }

    if (event.keyCode === 8) {
      this.setState({ value: event.target.value.replace(this.state.suggestion, '') })
    } else if (typeof this.state.suggestion === 'undefined' || this.state.suggestion.length < 1) {
      return false;
    } else {
      const startPos = this.state.value.indexOf(this.state.suggestion)
      const endPos = startPos + this.state.suggestion.length
      this.textHandler.setSelectionRange(startPos, endPos)
    }
  }

  handleChange(event) {
    // Catch value of the input box by every change
    const emailAddress = event.target.value
    const suggest = this.suggest(emailAddress)

    if (typeof suggest === 'undefined' || suggest.length < 1) {
      // Set value and suggestion state by every change
      this.setState({ value: emailAddress, suggestion: suggest })
    } else {
      // Update value state plus suggested text
      this.setState({ value: emailAddress + suggest, suggestion: suggest })
    }
  }

  suggest(string) {
    // Shim indexOf
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
    if (!Array.prototype.indexOf) {
      this.doIndexOf();
    }

    const str_arr = string.split('@')
    if (str_arr.length > 1) {
      string = str_arr.pop()
      if (!string.length) {
        return;
      }
    } else {
      return;
    }

    const match = this.state.domains.filter((domain) => {
      return domain.indexOf(string) === 0;
    }).shift() || '';

    return match.replace(string, '');
  }
  doIndexOf() {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if (this === undefined || this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      const length = this.length >>> 0; // Hack to convert object.length to a UInt32
      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (; fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    }
  }

  // https://github.com/callemall/material-ui/issues/705
  render() {
    return (
      <div className="eac-wrapper">
        <TextField
          floatingLabelText="Email address"
          id="email"
          type="text"
          className={this.state.class}
          value={this.state.value}
          onChange={this.handleChange}
          onKeyUp={this.getSuggest}
          ref={textField => {
            if (textField) {
              this.textHandler = textField.input
            }
          }}
          />
      </div>
    )
  }
}
