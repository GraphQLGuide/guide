import React from 'react';
import {TransitionMotion, spring} from 'react-motion'
import _ from 'lodash'

const leavingSpringConfig = {stiffness: 60, damping: 15};
const Ripple = React.createClass({
  getInitialState() {
    return {mouse: [], now: 't' + 0};
  },

  handleMouseMove({pageX, pageY}) {
    // Make sure the state is queued and not batched.
      this.setState(() => {
        return {
          mouse: [pageX - 25, pageY - 25],
          now: 't' + Date.now(),
        };
      });
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  willLeave(styleCell) {
    return {
      ...styleCell.style,
      opacity: spring(0, leavingSpringConfig),
      scale: spring(2, leavingSpringConfig),
    };
  },

  render() {
    const {mouse: [mouseX, mouseY], now} = this.state;
    const styles = mouseX == null ? [] : [{
      key: now,
      style: {
        opacity: spring(1),
        scale: spring(0),
        x: spring(mouseX),
        y: spring(mouseY),
      }
    }];
    return (
      <TransitionMotion willLeave={this.willLeave} styles={styles}>
        {circles =>
          <div
            onMouseMove={_.throttle(this.handleMouseMove, 100)}
            onTouchMove={_.throttle(this.handleTouchMove, 100)}
            >
            {circles.map(({key, style: {opacity, scale, x, y}}) =>
              <div
                key={key}
                className="ripple-ball"
                style={{
                  opacity: opacity,
                  scale: scale,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                }} />
            )}
            {this.props.children}
          </div>
        }
      </TransitionMotion>
    );
  },
});

export default Ripple;

// based on: https://github.com/chenglou/react-motion/blob/master/demos/demo7-water-ripples/Demo.jsx
//
// The MIT License (MIT)
//
// Copyright (c) 2015 React Motion authors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
