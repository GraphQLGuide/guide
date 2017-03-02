import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Head from 'next/head'
import css from 'next/css'
import { StaggeredMotion, spring } from 'react-motion'
import _ from 'lodash'
import { TimelineLite, TweenLite, Power0, Power2 } from 'gsap'

// https://github.com/greensock/GreenSock-JS/issues/193
import CustomEase from '../vendor/gsap/CustomEase'
// import CustomEase from '../vendor/CustomEase'

import Delay from '../components/delay'
import Email from '../components/email'
import SubscribeForm from '../components/SubscribeForm'
import BookLI from '../components/book-li'
import LogoLI from '../components/logo-li'
import Ripple from '../components/ripple'
import Emoji from '../components/emoji'

import muiTheme from '../lib/muitheme'
import { white, color, grey } from '../lib/styles'
import withData from '../lib/withData'

// fixes "Warning: Unknown prop `onTouchTap` on <label> tag."
if (typeof window !== 'undefined') injectTapEventPlugin()

const styles = {
  avatar: {
    marginRight: 10,
  },
  avatarLink: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px 0 20px',
    color: white,
    // color: '#ccc',
    // textDecoration: 'none',
  },
  listAnimation: {
    maxLeft: 200,
    default: { opacity: 0, left: 200 },
  },
}

const headerH = 280

const bookTopics = [
  'GraphQL beginner introduction',
  'GraphQL concepts in depth',
  'Frontend – using Apollo Client',
  'Backend – writing a GraphQL server',
  'Learn how to integrate with:',
]

class Index extends Component {
  componentDidMount() {
    const header = ReactDOM.findDOMNode(this.header)
    const introPara = ReactDOM.findDOMNode(this.introPara)
    const logos = ReactDOM.findDOMNode(this.logos)
    const comingSoon = ReactDOM.findDOMNode(this.comingSoon)

    const animation = new TimelineLite({ paused: true })

    // timeline.to(header, 2, { rotationX: 0, scale: 1.3 })

    const path = 'M0,0 C0.46,0 0.804,0.243 0.87,0.368 0.928,0.478 0.884,0.4 1,1'
    const ease = CustomEase.create('steep-fall', path)
    TweenLite.set(header, {
      x: -header.offsetWidth, // '-100%' percentage not supported
    })
    TweenLite.set(introPara, {
      x: -50,
      opacity: 0,
    })
    TweenLite.set(logos, {
      opacity: 0,
    })
    TweenLite.set(comingSoon, {
      x: -300,
      scale: 0.3,
      opacity: 0,
    })

    animation
    .delay(0.6) // wait for browser to not be busy. todo requestIdleCallback
    .to(header, 1, {
      x: 0,
      ease: Power2.easeIn,
    })
    .to(introPara, 1.5, {
      x: 0,
      opacity: 1,
      ease: Power2.easeIn,
      delay: 0.5,
    })
    .to(logos, 2, {
      opacity: 1,
      ease: Power2.easeIn,
      delay: 0.8,
    })
    .to(comingSoon, 0.35, {
      opacity: 1,
      x: 0,
      scale: 1,
      ease: Power2.easeIn,
    })

    animation.play()
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Ripple>
          <Head>
            <title>
              The GraphQL Guide
            </title>
          </Head>
          <main className="-landing">
            <Paper
              className="landing-header"
              zDepth={2}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: 10,
                backgroundColor: color,
                color: white,
                willChange: 'transform',
                transform: 'translateX(-100%)',
              }}
              ref={(header) => { this.header = header }}
              >
              <div
                id="logo"
                className="hvr-float-shadow"
                style={{
                  width: 300,
                }}
                >
                { // eslint-disable-next-line
                }<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 279.4 249.6"><path id="logo-outline" d="M267.4 171.4V47.2c8.3-1.9 13.5-10.3 11.6-18.6-1.9-8.3-10.3-13.5-18.6-11.6-7 1.6-12 7.9-12 15.1 0 .4 0 .8.1 1.3L227 40.3v-9.7c8.3-1.9 13.5-10.3 11.6-18.6S228.2-1.5 219.9.4c-6 1.4-10.6 6.2-11.7 12.3-27.9 2.2-53.8 10.4-68.5 39.2-14.7-28.7-40.6-37-68.5-39.2-1.6-8.4-9.6-14-18.1-12.4s-14 9.6-12.4 18.1c1.1 6.1 5.7 10.9 11.8 12.3v9.7l-21.5-7c0-.4.1-.8.1-1.3 0-8.6-6.9-15.5-15.5-15.5S0 23.5 0 32.1c0 7.2 5 13.5 12 15.1v124.1C3.7 173.3-1.5 181.6.5 190s10.3 13.5 18.6 11.6c4-.9 7.4-3.4 9.6-6.9l95.5 37.1c-.1.7-.2 1.5-.2 2.2.4 8.6 7.7 15.1 16.3 14.7 8-.4 14.3-6.8 14.7-14.7 0-.7-.1-1.3-.1-2l95.9-37.3c4.6 7.2 14.1 9.4 21.4 4.9 7.2-4.6 9.4-14.1 4.9-21.4-2.3-3.4-5.7-5.9-9.7-6.8zm-140.8 54l-95.7-37.3c.1-.5.1-1.1.1-1.6 0-7.2-5-13.5-12-15.1V47.2c4.1-1 7.7-3.5 9.8-7.2l23.6 7.6V155c-8.3 1.9-13.5 10.3-11.6 18.6s10.3 13.5 18.6 11.6c5.3-1.2 9.6-5.2 11.3-10.4 25 4 51.5 18.1 64.6 44.2-3.5 1-6.6 3.3-8.7 6.4zm11.1-157.8V209c-15.2-24-41.6-37.2-66.4-41.1-.9-6.3-5.6-11.4-11.8-12.8V30.6c5.5-1.3 9.9-5.4 11.4-10.9 14.9 1.2 26.5 4.1 36 8.7 13.6 6.7 23.3 17.5 29.6 33.2l1.2 3.1v2.9zm4 7.3V64.7l1.2-3.1c6.3-15.7 16-26.5 29.6-33.2 9.4-4.6 21.1-7.4 35.9-8.7 1.5 5.4 5.9 9.6 11.4 10.9v124.5c-6.2 1.4-10.9 6.5-11.8 12.8-24.8 3.9-51.1 17-66.4 41.1V74.9zm118.7 96.5c-7 1.6-12 7.9-12 15.1 0 .6 0 1.1.1 1.6l-96.1 37.4c-2-3-5-5.2-8.4-6.3 13-26.1 39.6-40.3 64.7-44.3 2.6 8.2 11.3 12.7 19.5 10.1 8.2-2.6 12.7-11.3 10.1-19.5-1.7-5.2-5.9-9.2-11.3-10.4V47.7l23.7-7.6c2.2 3.6 5.7 6.2 9.8 7.2l-.1 124.1z"/><path d="M70.8 174.9c-2.6 8.2-11.3 12.7-19.5 10.1-8.2-2.6-12.7-11.3-10.1-19.5 1.7-5.2 5.9-9.2 11.3-10.4V47.7l-23.6-7.6c-2.2 3.6-5.7 6.2-9.8 7.2v124.1c7 1.6 12 7.9 12 15.1 0 .5 0 1.1-.1 1.6l95.7 37.2c2.1-3.1 5.2-5.3 8.8-6.2-13.2-26.1-39.7-40.2-64.7-44.2zM250.6 40.1l-23.7 7.6v107.4c8.3 1.9 13.5 10.3 11.6 18.6-1.9 8.3-10.3 13.5-18.6 11.6-5.3-1.2-9.6-5.2-11.3-10.4-25 4-51.6 18.2-64.7 44.3 3.4 1.1 6.4 3.3 8.4 6.3l96.1-37.4c-.1-.5-.1-1.1-.1-1.6 0-7.2 5-13.5 12-15.1V47.2c-4-.9-7.6-3.5-9.7-7.1z"/><path d="M59.5 155.1c6.2 1.4 10.9 6.5 11.9 12.8 24.8 3.9 51.1 17 66.4 41.1V64.7l-1.2-3.1c-6.3-15.7-16-26.5-29.6-33.2-9.4-4.6-21.1-7.4-36-8.7-1.5 5.4-5.9 9.6-11.4 10.9v124.5zm82.2 53.9c15.2-24.1 41.6-37.2 66.4-41.1.9-6.3 5.6-11.4 11.8-12.8V30.6c-5.5-1.3-9.9-5.4-11.4-10.9-14.9 1.3-26.5 4.1-35.9 8.7-13.6 6.7-23.3 17.5-29.6 33.2l-1.2 3.1-.1 144.3z"/></svg>
              </div>
              <div className="book-title">
                <h1
                  style={{
                    fontWeight: 400,
                    margin: '0 0 20px 0',
                    textAlign: 'center',
                  }}
                  >
                  The GraphQL Guide
                </h1>
                <h2
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 300,
                    color: white,
                  }}
                  >
                  {"It's the new REST"}
                  <Emoji
                    name="sparkles"
                    size={50}
                    />
                </h2>
              </div>
              <div
                className="by-authors"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                By
                <div className="authors">
                  <a
                    href="https://twitter.com/helferjs"
                    style={styles.avatarLink}
                    className="author-link"
                    >
                    <Avatar
                      src="https://pbs.twimg.com/profile_images/705848506536210432/Gonh3JNx.jpg"
                      style={styles.avatar}
                      size={50}
                      />
                    Jonas Helfer
                  </a>
                  <span className="-and">
                    and
                  </span>
                  <a
                    href="https://twitter.com/lorendsr"
                    style={styles.avatarLink}
                    className="author-link"
                    >
                    <Avatar
                      src="http://lorensr.me/img/loren-sq.png"
                      style={styles.avatar}
                      size={50}
                      />
                    Loren Sands-Ramshaw
                  </a>
                </div>
              </div>
            </Paper>
            <section
              className="landing-main"
              style={{
                display: 'flex',
                flex: '1',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
              <p
                style={{
                  opacity: 0,
                  padding: '20px 20px 0 20px',
                  marginTop: 0,
                  marginBottom: 0,
                  maxWidth: '600px',
                }}
                ref={(introPara) => { this.introPara = introPara }}
                >
                <b>
                  The GraphQL Guide
                </b>
                {` is an upcoming book on GraphQL (which is the best way to write an API or
                fetch data for your app). `}
                <a href="https://twitter.com/helferjs">
                  Jonas
                </a>
                {' works on the team behind the '}
                <a href="http://dev.apollodata.com/">
                  Apollo
                </a>
                {' GraphQL client, and '}
                <a href="https://twitter.com/lorendsr">
                  Loren
                </a>
                {' is a freelancer and '}
                <a href="https://www.meteor.com/">
                  Meteor
                </a>
                {' maintainer. We’re in the process of writing '}
                <em>
                  the best
                </em>
                {' GraphQL reference, which includes:'}
              </p>
              <Delay
                ms={3500}
                initial={false}
                value
                >
                { ready =>
                  <StaggeredMotion
                    defaultStyles={_.times(bookTopics.length,
                      _.constant(styles.listAnimation.default),
                    )}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((x, i) => {
                      if (!ready) {
                        return styles.listAnimation.default
                      }

                      const prev = prevInterpolatedStyles[i - 1] || styles.listAnimation.default
                      let left
                      if (i === 0 || prev.left < 1) {
                        left = 0
                      } else {
                        left = Math.min(
                          prev.left * 1.2,
                          styles.listAnimation.maxLeft,
                        )
                      }

                      let opacity
                      if (i === 0 || prev.opacity > 0.7) {
                        opacity = 1
                      } else {
                        opacity = prev.opacity * 0.99
                      }

                      return {
                        opacity: prev.opacity > 0.95 ? 1 : spring(opacity, {
                          stiffness: 30,
                          damping: 26,
                        }),
                        left: spring(left, {
                          stiffness: 150,
                          damping: 26,
                        }),
                      }
                    })}
                    >
                    {interpolatingStyles =>
                      <ul
                        style={{
                          marginBottom: 0,
                        }}
                        >
                        {interpolatingStyles.map((style, i) => (
                          <BookLI
                            key={i} // eslint-disable-line
                            style={{
                              transform: `translateX(-${style.left}px)`,
                              opacity: style.opacity,
                            }}
                            >
                            {bookTopics[i]}
                          </BookLI>
                        ))}
                      </ul>
                    }
                  </StaggeredMotion>
                }
              </Delay>
              <section
                className="logo-collection"
                style={{
                  opacity: 0,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
                ref={(logos) => { this.logos = logos }}
                >
                <LogoLI name="React & React Native">
                  { // eslint-disable-next-line
                  }<svg height="70" width="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle fill="#00D8FF" cx="299.529" cy="299.628" r="50.167"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M299.53 197.628c67.355 0 129.927 9.665 177.106 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.555 0-127.63-7.492-174.29-23.44-59.047-20.183-94.612-52.104-94.612-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M210.736 248.922c33.65-58.348 73.28-107.724 110.92-140.48 45.35-39.466 88.507-54.923 111.775-41.505 24.25 13.983 33.043 61.814 20.068 124.796-9.81 47.618-33.234 104.212-65.176 159.6-32.75 56.79-70.25 106.82-107.377 139.273-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.31-31.906-56.922-20.834-115.234 9.355-49.27 32.832-109.745 66.81-168.664z"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M210.82 351.482c-33.745-58.292-56.73-117.287-66.31-166.255-11.545-59-3.383-104.11 19.863-117.566 24.224-14.023 70.055 2.245 118.14 44.94 36.356 32.28 73.688 80.838 105.723 136.174 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.058 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.252-112.76-142.114z" /></svg>
                </LogoLI>
                <LogoLI name="Redux">
                  { // eslint-disable-next-line
                  }<svg height="70" width="70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#764ABC"><path d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/><path d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/><path d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z" /></g></svg>
                </LogoLI>
                <LogoLI name="Angular">
                  <svg height="70" width="70" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
                    <path className="st0" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" />
                    <path className="st1" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" />
                    <path className="st2" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" />
                  </svg>
                </LogoLI>
                <LogoLI name="Node">
                  { // eslint-disable-next-line
                  }<svg height="70" width="70" viewBox="0 0 256 282" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"><g fill="#8CC84B"><path d="M116.504 3.58c6.962-3.985 16.03-4.003 22.986 0 34.995 19.774 70.001 39.517 104.99 59.303 6.581 3.707 10.983 11.031 10.916 18.614v118.968c.049 7.897-4.788 15.396-11.731 19.019-34.88 19.665-69.742 39.354-104.616 59.019-7.106 4.063-16.356 3.75-23.24-.646-10.457-6.062-20.932-12.094-31.39-18.15-2.137-1.274-4.546-2.288-6.055-4.36 1.334-1.798 3.719-2.022 5.657-2.807 4.365-1.388 8.374-3.616 12.384-5.778 1.014-.694 2.252-.428 3.224.193 8.942 5.127 17.805 10.403 26.777 15.481 1.914 1.105 3.852-.362 5.488-1.274 34.228-19.345 68.498-38.617 102.72-57.968 1.268-.61 1.969-1.956 1.866-3.345.024-39.245.006-78.497.012-117.742.145-1.576-.767-3.025-2.192-3.67-34.759-19.575-69.5-39.18-104.253-58.76a3.621 3.621 0 0 0-4.094-.006C91.2 39.257 56.465 58.88 21.712 78.454c-1.42.646-2.373 2.071-2.204 3.653.006 39.245 0 78.497 0 117.748a3.329 3.329 0 0 0 1.89 3.303c9.274 5.259 18.56 10.481 27.84 15.722 5.228 2.814 11.647 4.486 17.407 2.33 5.083-1.823 8.646-7.01 8.549-12.407.048-39.016-.024-78.038.036-117.048-.127-1.732 1.516-3.163 3.2-3 4.456-.03 8.918-.06 13.374.012 1.86-.042 3.14 1.823 2.91 3.568-.018 39.263.048 78.527-.03 117.79.012 10.464-4.287 21.85-13.966 26.97-11.924 6.177-26.662 4.867-38.442-1.056-10.198-5.09-19.93-11.097-29.947-16.55C5.368 215.886.555 208.357.604 200.466V81.497c-.073-7.74 4.504-15.197 11.29-18.85C46.768 42.966 81.636 23.27 116.504 3.58z"/><path d="M146.928 85.99c15.21-.979 31.493-.58 45.18 6.913 10.597 5.742 16.472 17.793 16.659 29.566-.296 1.588-1.956 2.464-3.472 2.355-4.413-.006-8.827.06-13.24-.03-1.872.072-2.96-1.654-3.195-3.309-1.268-5.633-4.34-11.212-9.642-13.929-8.139-4.075-17.576-3.87-26.451-3.785-6.479.344-13.446.905-18.935 4.715-4.214 2.886-5.494 8.712-3.99 13.404 1.418 3.369 5.307 4.456 8.489 5.458 18.33 4.794 37.754 4.317 55.734 10.626 7.444 2.572 14.726 7.572 17.274 15.366 3.333 10.446 1.872 22.932-5.56 31.318-6.027 6.901-14.805 10.657-23.56 12.697-11.647 2.597-23.734 2.663-35.562 1.51-11.122-1.268-22.696-4.19-31.282-11.768-7.342-6.375-10.928-16.308-10.572-25.895.085-1.619 1.697-2.748 3.248-2.615 4.444-.036 8.888-.048 13.332.006 1.775-.127 3.091 1.407 3.182 3.08.82 5.367 2.837 11 7.517 14.182 9.032 5.827 20.365 5.428 30.707 5.591 8.568-.38 18.186-.495 25.178-6.158 3.689-3.23 4.782-8.634 3.785-13.283-1.08-3.925-5.186-5.754-8.712-6.95-18.095-5.724-37.736-3.647-55.656-10.12-7.275-2.571-14.31-7.432-17.105-14.906-3.9-10.578-2.113-23.662 6.098-31.765 8.006-8.06 19.563-11.164 30.551-12.275z" /></g></svg>
                </LogoLI>
                <LogoLI name="iOS">
                  { // eslint-disable-next-line
                  }<svg id="apple-logo" width="170" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" height="170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.5 3.24-12.742 3.35-4.93.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.03-7.08-9.168-15.29-12.41-24.65-3.47-10.11-5.21-19.9-5.21-29.378 0-10.857 2.346-20.22 7.045-28.068C27.508 57.03 32.42 52.06 38.57 48.41s12.793-5.51 19.948-5.63c3.915 0 9.05 1.21 15.43 3.59 6.36 2.39 10.446 3.6 12.237 3.6 1.34 0 5.877-1.416 13.57-4.24 7.275-2.617 13.415-3.7 18.445-3.274 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.385-18.22 17.73-18.1 31 .11 10.338 3.86 18.94 11.23 25.77 3.34 3.17 7.07 5.62 11.22 7.36-.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.67-7.12 8.323-15.732 13.133-25.07 12.374-.12-.972-.19-1.995-.19-3.07 0-7.778 3.387-16.102 9.4-22.908 3.002-3.446 6.82-6.31 11.45-8.597 4.62-2.253 8.99-3.498 13.1-3.71.12 1.082.17 2.165.17 3.24z"/></svg>
                </LogoLI>
                <LogoLI name="Android">
                  { // eslint-disable-next-line
                  }<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><path fill="#9FBF3B" d="M301.314 83.298l20.16-29.272c1.196-1.74.898-4.024-.667-5.104-1.563-1.074-3.805-.543-4.993 1.2l-20.95 30.408c-13.808-5.44-29.14-8.47-45.3-8.47-16.16 0-31.496 3.028-45.302 8.47l-20.948-30.41c-1.2-1.74-3.44-2.273-5.003-1.2-1.563 1.078-1.86 3.363-.663 5.105l20.166 29.272c-32.063 14.916-54.548 43.26-57.413 76.34h218.316c-2.855-33.08-25.34-61.423-57.402-76.34"/><path fill="#FFF" d="M203.956 129.438c-6.673 0-12.08-5.407-12.08-12.08 0-6.67 5.404-12.08 12.08-12.08 6.668 0 12.073 5.408 12.073 12.08s-5.406 12.08-12.074 12.08M295.16 129.438c-6.667 0-12.073-5.407-12.073-12.08 0-6.672 5.406-12.08 12.074-12.08 6.676 0 12.08 5.41 12.08 12.08 0 6.672-5.406 12.08-12.08 12.08"/><path fill="#9FBF3B" d="M126.383 297.598c0 13.45-10.904 24.354-24.355 24.354-13.45 0-24.354-10.904-24.354-24.354V199.09c0-13.45 10.904-24.354 24.354-24.354s24.355 10.904 24.355 24.354v98.508zM140.396 175.49v177.914c0 10.566 8.566 19.133 19.135 19.133h22.634v54.744c0 13.452 10.903 24.355 24.354 24.355 13.45 0 24.355-10.903 24.355-24.354v-54.743h37.37v54.744c0 13.452 10.903 24.355 24.355 24.355s24.354-10.903 24.354-24.354v-54.743h22.633c10.57 0 19.137-8.562 19.137-19.133V175.49H140.396zM372.734 297.598c0 13.45 10.903 24.354 24.354 24.354 13.45 0 24.354-10.904 24.354-24.354V199.09c0-13.45-10.904-24.354-24.354-24.354s-24.354 10.904-24.354 24.354v98.508z"/></svg>
                </LogoLI>
              </section>
              <Paper
                className="form-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginBottom: 20,
                  willChange: 'opacity, transform',
                }}
                zDepth={2}
                ref={(comingSoon) => { this.comingSoon = comingSoon }}
                >
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.7em',
                  }}
                  >
                  Coming soon
                </h2>
                <SubscribeForm />
              </Paper>
            </section>
          </main>
        </Ripple>
      </MuiThemeProvider>
    )
  }
}

export default withData(Index)
