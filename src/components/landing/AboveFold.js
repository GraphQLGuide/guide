import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Typed from 'typed.js'
import { Image } from 'cloudinary-react'
import Button from 'material-ui/Button'
import scrollIntoView from 'scroll-into-view-if-needed'

import './AboveFold.css'

const delay = 400
const largeMessage = `<b>GraphQL?</b>^${delay}\nThe best way to fetch data\nfor your app 👌^1000\n\n<b>The GraphQL Guide?</b>^${delay}\nThe best way to learn GraphQL 😃`,
  narrowMessage = `<b>GraphQL?</b>^${delay}\nThe best way\nto fetch data\nfor your app 👌^1000\n\n<b>The GraphQL Guide?</b>^${delay}\nThe best way\nto learn GraphQL 😃`,
  mediumMessage = `<b>GraphQL?</b>^${delay}\nThe best way to fetch data\nfor your app 👌^1000\n\n<b>The GraphQL Guide?</b>^${delay}\nThe best way to learn\nGraphQL 😃`

class AboveFold extends Component {
  constructor(props) {
    super(props)

    this.heroRef = React.createRef()
    this.buttonsRef = React.createRef()
  }

  componentDidMount() {
    const heroNode = ReactDOM.findDOMNode(this.heroRef.current)
    setTimeout(() => heroNode.classList.add('-transform'), 20)
  }

  startTyping = () => {
    const width = window.innerWidth
    let message = largeMessage
    if (width < 1330 && width >= 940) {
      message = narrowMessage
    } else if (width < 520 && width > 380) {
      message = mediumMessage
    } else if (width <= 380) {
      message = narrowMessage
    }

    this.typed = new Typed(this.typingEl, {
      startDelay: 200,
      strings: [message],
      typeSpeed: 30,
      cursorChar: '▌',
      autoInsertCss: true,
      onComplete: () => {
        this.showButtons()

        setTimeout(() => {
          document.querySelector('.typed-cursor').style.display = 'none'
        }, 1200)
      }
    })

    // on narrow screens, eg iphone X, typing goes below fold
    if (width <= 380) {
      setTimeout(() => {
        window.scroll({
          top: window.scrollY + 70,
          left: window.scrollX,
          behavior: 'smooth'
        })
      }, 4000)
    }
  }

  componentWillUnmount() {
    this.typed && this.typed.destroy()
  }

  showButtons = () => {
    const buttons = this.buttonsRef.current
    buttons.style.opacity = 1

    if (window.scrollY < buttons.getBoundingClientRect().y) {
      scrollIntoView(buttons, {
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }

  scrollTo = selector => {
    scrollIntoView(document.querySelector(selector), {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })
  }

  render() {
    return (
      <div className="AboveFold">
        <div className="AboveFold-hero-container">
          <Image
            className="AboveFold-hero"
            publicId="book"
            fetchFormat="auto"
            quality="auto"
            onTransitionEnd={() => setTimeout(this.startTyping, 400)}
            ref={this.heroRef}
          />
        </div>
        <div className="AboveFold-main">
          <div className="AboveFold-typing-container">
            <span
              className="AboveFold-typing"
              ref={el => {
                this.typingEl = el
              }}
            />
          </div>
          <div className="AboveFold-buttons" ref={this.buttonsRef}>
            <Button
              variant="raised"
              onClick={() => this.scrollTo('.BelowFold')}
            >
              Learn more
            </Button>
            <Button
              variant="raised"
              color="primary"
              onClick={() => this.scrollTo('.Pricing')}
            >
              Get the beta
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AboveFold
