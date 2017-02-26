// https://developer.github.com/v3/emojis/
// http://www.webpagefx.com/tools/emoji-cheat-sheet/
import { PropTypes } from 'react'
import stylePropType from 'react-style-proptype'

const Emoji = ({ name, size, style, ...props }) => {
  const src = `https://github.global.ssl.fastly.net/images/icons/emoji/${name}.png?v5`

  return (
    <img
      src={src}
      alt={name}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      className="emoji"
      {...props}
      />
  )
}

Emoji.defaultProps = {
  size: '1.5em',
  style: {},
}

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
  style: stylePropType,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default Emoji
