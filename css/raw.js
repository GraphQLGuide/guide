import { grey200 } from 'material-ui/styles/colors'

import { fontFamily, color, white, black, grey } from '../lib/styles'

const background = '#f2f2f2'

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
#logo > svg * {
  fill: ${white};
}

.logo-collection > svg {
  width: 150px;
  height: 150px;
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
`
