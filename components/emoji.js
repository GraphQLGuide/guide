// https://developer.github.com/v3/emojis/
// http://www.webpagefx.com/tools/emoji-cheat-sheet/
import React from 'react'

const Emoji = ({ name, size }) => {
  const src = `https://github.global.ssl.fastly.net/images/icons/emoji/${name}.png?v5`

  return (
    <img
      src={src}
      alt={name}
      style={{
        width: size,
        height: size,
      }}
      />
  )
}

Emoji.defaultProps = {
  size: '1.5em',
}

Emoji.propTypes = {
  name: React.PropTypes.string.isRequired,
  size: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
}

export default Emoji
