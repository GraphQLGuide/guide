import React from 'react'
import PropTypes from 'prop-types'
import stylePropType from 'react-style-proptype'

import './Emoji.css'

// https://emojipedia.org/
const srcs = {
  nerd:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/nerd-face_1f913.png',
  white_check_mark:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/white-heavy-check-mark_2705.png',
  right_pointing_magnifying_glass:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/right-pointing-magnifying-glass_1f50e.png',
  thumbsup:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png',
  ok_hand:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/ok-hand-sign_1f44c.png',
  point_down:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/white-down-pointing-backhand-index_1f447.png',
  punch:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/fisted-hand-sign_1f44a.png',
  smile:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/smiling-face-with-open-mouth-and-smiling-eyes_1f604.png',
  book:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/open-book_1f4d6.png',
  smiley:
    'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/smiling-face-with-open-mouth_1f603.png'
}

// https://developer.github.com/v3/emojis/
// http://www.webpagefx.com/tools/emoji-cheat-sheet/
const Emoji = ({ name, size, style, className, ...props }) => {
  const src =
    srcs[name] ||
    `https://github.global.ssl.fastly.net/images/icons/emoji/${name}.png?v5`

  return (
    <img
      src={src}
      alt={name}
      style={{
        width: size,
        height: size,
        ...style
      }}
      className={`Emoji ${className}`}
      {...props}
    />
  )
}

Emoji.defaultProps = {
  style: {},
  className: ''
}

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: stylePropType,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Emoji
