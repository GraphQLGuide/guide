import { fontFamily, color } from '../lib/styles'

export default `
body {
  font-family: ${fontFamily};
  color: #333;
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
}
`
