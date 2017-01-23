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


`
