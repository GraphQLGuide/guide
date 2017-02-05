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
import SubscribeForm from '../components/SubscribeForm.js'
import BookLI from '../components/book-li'
import Ripple from '../components/ripple'

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
  paper: {
    height: '45vh',
    width: '45vh',
    maxHeight: 400,
    maxWidth: 400,
    minHeight: 320,
    minWidth: 320,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    willChange: 'opacity, transform',
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
  'React, React Native, Redux, Angular, and Node',
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
      y: -headerH,
    })
    TweenLite.set(introPara, {
      x: -50,
      opacity: 0,
    })
    TweenLite.set(logos, {
      opacity: 0,
    })
    TweenLite.set(comingSoon, {
      x: -100,
      y: 100,
      scale: 0.5,
      opacity: 0,
      rotation: -180,
    })

    animation
    .delay(0.6) // wait for browser to not be busy. todo requestIdleCallback
    .to(header, 1.5, {
      y: 0,
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
    .to(comingSoon, 0.7, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
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
              The GraphQL Book
            </title>
          </Head>
          <Paper
            zDepth={2}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: headerH,
              backgroundColor: color,
              color: white,
              willChange: 'transform',
              transform: 'translateY(-100%)',
              // transform: 'scale(.7) rotateX(90deg)',
              // transformOrigin: '0 0',
              // perspective: '1000px',
            }}
            ref={(header) => { this.header = header }}
            >
            <div
              style={{
                marginRight: '10vw',
              }}
              id="logo"
              >
              { // eslint-disable-next-line
              }<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path fill="#E10098" d="M57.468 302.66l-14.376-8.3 160.15-277.38 14.376 8.3z"/><path fill="#E10098" d="M39.8 272.2h320.3v16.6H39.8z"/><path fill="#E10098" d="M206.348 374.026l-160.21-92.5 8.3-14.376 160.21 92.5zM345.522 132.947l-160.21-92.5 8.3-14.376 160.21 92.5z"/><path fill="#E10098" d="M54.482 132.883l-8.3-14.375 160.21-92.5 8.3 14.376z"/><path fill="#E10098" d="M342.568 302.663l-160.15-277.38 14.376-8.3 160.15 277.38zM52.5 107.5h16.6v185H52.5zM330.9 107.5h16.6v185h-16.6z"/><path fill="#E10098" d="M203.522 367l-7.25-12.558 139.34-80.45 7.25 12.557z"/><path fill="#E10098" d="M369.5 297.9c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.8 9.7 22.5 31 12.8 47.7M90.9 137c-9.6 16.7-31 22.4-47.7 12.8-16.7-9.6-22.4-31-12.8-47.7 9.6-16.7 31-22.4 47.7-12.8 16.7 9.7 22.4 31 12.8 47.7M30.5 297.9c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.8 9.6-38.1 3.9-47.7-12.8M309.1 137c-9.6-16.7-3.9-38 12.8-47.7 16.7-9.6 38-3.9 47.7 12.8 9.6 16.7 3.9 38-12.8 47.7-16.7 9.6-38.1 3.9-47.7-12.8M200 395.8c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.2-15.6 34.9-34.9 34.9M200 74c-19.3 0-34.9-15.6-34.9-34.9 0-19.3 15.6-34.9 34.9-34.9 19.3 0 34.9 15.6 34.9 34.9 0 19.3-15.6 34.9-34.9 34.9"/></svg>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              >
              <h1
                style={{
                  textAlign: 'center',
                  fontSize: 70,
                  fontWeight: 400,
                  margin: '0 0 10px 0',
                }}
                >
                GraphQL: The New REST
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                By
                <a
                  href="https://twitter.com/helferjs"
                  style={styles.avatarLink}
                  >
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/705848506536210432/Gonh3JNx.jpg"
                    style={styles.avatar}
                    />
                  Jonas Helfer
                </a>
                and
                <a
                  href="https://twitter.com/lorendsr"
                  style={styles.avatarLink}
                  >
                  <Avatar
                    src="http://lorensr.me/img/loren-sq.png"
                    style={styles.avatar}
                    />
                  Loren Sands-Ramshaw
                </a>
              </div>
              <h2
                style={{
                  margin: '40px 0 0 0',
                  fontWeight: 300,
                  fontSize: 30,
                  color: white,
                }}
                >
                Book and online companion course
              </h2>
            </div>
          </Paper>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: `calc(100vh - ${headerH}px)`,
            }}
            >
            <section
              style={{
                alignSelf: 'flex-start',
                marginTop: 20,
                maxWidth: 500,
              }}
              >
              <p
                style={{
                  maxWidth: 500,
                  opacity: 0,
                }}
                ref={(introPara) => { this.introPara = introPara }}
                >
                <b>
                  GraphQL: The New REST
                </b>
                {` is an upcoming book on GraphQL, the best way to write an API or
                fetch data for your app. `}
                <br />
                <a href="https://twitter.com/helferjs">
                  Jonas
                </a>
                {' works on the team behind the '}
                <a href="http://dev.apollodata.com/">
                  Apollo
                </a>
                {' GraphQL client and '}
                <a href="https://twitter.com/lorendsr">
                  Loren
                </a>
                {' is a full-stack freelancer and '}
                <a href="https://www.meteor.com/">
                  Meteor
                </a>
                {` maintainer. We’re in the process of writing the best GraphQL
                reference, which inclues:`}
              </p>
              <Delay
                ms={4000}
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
                      <ul>
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
              <div
                style={{
                  display: 'flex',
                  width: 450,
                  justifyContent: 'space-between',
                  marginLeft: 30,
                  opacity: 0,
                }}
                className="logo-collection"
                ref={(logos) => { this.logos = logos }}
                >
                { // eslint-disable-next-line
                }<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><circle fill="#00D8FF" cx="299.529" cy="299.628" r="50.167"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M299.53 197.628c67.355 0 129.927 9.665 177.106 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.555 0-127.63-7.492-174.29-23.44-59.047-20.183-94.612-52.104-94.612-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M210.736 248.922c33.65-58.348 73.28-107.724 110.92-140.48 45.35-39.466 88.507-54.923 111.775-41.505 24.25 13.983 33.043 61.814 20.068 124.796-9.81 47.618-33.234 104.212-65.176 159.6-32.75 56.79-70.25 106.82-107.377 139.273-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.31-31.906-56.922-20.834-115.234 9.355-49.27 32.832-109.745 66.81-168.664z"/><path fill="none" stroke="#00D8FF" strokeWidth="24" strokeMiterlimit="10" d="M210.82 351.482c-33.745-58.292-56.73-117.287-66.31-166.255-11.545-59-3.383-104.11 19.863-117.566 24.224-14.023 70.055 2.245 118.14 44.94 36.356 32.28 73.688 80.838 105.723 136.174 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.058 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.252-112.76-142.114z"/></svg>
                { // eslint-disable-next-line
                }<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#764ABC"><path d="M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z"/><path d="M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z"/><path d="M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z"/></g></svg>
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
                  <path className="st0" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z" />
                  <path className="st1" d="M125 30v22.2-.1V230l78.9-43.7 14.2-123.1L125 30z" />
                  <path className="st2" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z" />
                </svg>
              </div>
            </section>
            <Paper
              style={styles.paper}
              zDepth={2}
              circle
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
              <a
                href="https://twitter.com/graphqlguide"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: grey,
                }}
                className="-grey"
                >
                @graphqlguide
                <svg className="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                  <path d="M153.62 301.59c94.34 0 145.94-78.16 145.94-145.94 0-2.22 0-4.43-.15-6.63A104.36 104.36 0 0 0 325 122.47a102.38 102.38 0 0 1-29.46 8.07 51.47 51.47 0 0 0 22.55-28.37 102.79 102.79 0 0 1-32.57 12.45 51.34 51.34 0 0 0-87.41 46.78A145.62 145.62 0 0 1 92.4 107.81a51.33 51.33 0 0 0 15.88 68.47A50.91 50.91 0 0 1 85 169.86v.65a51.31 51.31 0 0 0 41.15 50.28 51.21 51.21 0 0 1-23.16.88 51.35 51.35 0 0 0 47.92 35.62 102.92 102.92 0 0 1-63.7 22 104.41 104.41 0 0 1-12.21-.74 145.21 145.21 0 0 0 78.62 23" />
                </svg>
              </a>
            </Paper>
          </div>
        </Ripple>
      </MuiThemeProvider>
    )
  }
}

export default withData(Index)
