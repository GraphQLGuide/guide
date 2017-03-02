import { grey200 } from 'material-ui/styles/colors'

import { fontFamily, color, white, black, grey, iPadMaxW } from '../lib/styles'

const background = '#f2f2f2'

const macbookAirMaxW = 1279

export default `
body {
  font-family: ${fontFamily};
  color: ${black};
  background-color: ${background};
  font-size: 18px;
  line-height: 1.7;
}
@media screen and (max-width: 760px) {
  body {
    font-size: 16px;
  }
}

a {
  color: ${color};
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}

.form-container {
  margin-top: 30px;
}
@media (max-height: 825px) {
  .form-container {
    margin-top: 10px;
  }
}

main.-landing {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
}
.landing-header {
  width: 43vw;
}
.book-title {
  margin: 5vh 0 15vh 0;
}
@media (max-width: ${iPadMaxW}px) {
  .landing-header {
    width: 100vw;
  }

  .book-title {
    margin: 10px 0 20px 0;
  }

  main.-landing {
    display: block;
    height: auto;
    min-height: auto;
  }

  .by-authors {
    margin-bottom: 10px;
  }

  .landing-main {
    padding-top: 20px;
  }
}

.ripple-ball {
  width: 50px;
  height: 50px;
  border-radius: 99px;
  position: absolute;
  border: 1px solid #f3f3f3;
  pointer-events: none;
  z-index: 1;
  will-change: opacity, transform;
}

#logo > svg {
  width: 200px;
  height: 200px;
}
#logo > svg path:not(#logo-outline) {
  fill: rgba(0,0,0,0);
}
#logo-outline {
  fill: ${white};
}

#apple-logo * {
  fill: #aaaaaa;
}

.logo-collection .svg-wrapper {
  width: 80px;
  height: 80px;
}
@media (max-height: 799px), (max-width: 1425px) {
  .logo-collection .svg-wrapper {
    width: 50px;
    height: 50px;
  }
}

.logo-collection svg {
  width: 100%;
  height: 100%;
}
.logo-collection > .logo:hover {
  background-color: white;
}
.logo-collection > .logo:hover svg {
  animation: spin 3s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate3d(0,1,0,360deg);
  }
}

.author-link:hover > img {
  animation: spin 3s linear infinite;
}

.st0 {
  fill: #DD0031;
}
.st1 {
  fill: #C3002F;
}
.st2 {
  fill:#FFFFFF;
}

svg.twitter {
  width: 30px;
  height: 30px;
  margin-left: 6px;
}
svg.twitter * {
  fill: ${grey};
}

a.-grey:hover {
  text-decoration: none;
  opacity: 0.5;
}

.hvr-grow-shadow .emoji {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover .emoji, .hvr-grow-shadow:focus .emoji, .hvr-grow-shadow:active .emoji{
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
.hvr-grow-shadow:hover {
  background-color: white;
}

.hvr-float-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px transparent;
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
}
.hvr-float-shadow:before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, transparent 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, transparent 80%);
  /* W3C */
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, opacity;
  transition-property: transform, opacity;
}
.hvr-float-shadow:hover, .hvr-float-shadow:focus, .hvr-float-shadow:active {
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  /* move the element up by 5px */
}
.hvr-float-shadow:hover:before, .hvr-float-shadow:focus:before, .hvr-float-shadow:active:before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  /* move the element down by 5px (it will stay in place because it's attached to the element that also moves up 5px) */
}
`
