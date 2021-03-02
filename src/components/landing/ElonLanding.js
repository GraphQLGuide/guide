import React from 'react'
import { Image } from 'cloudinary-react'
import Typography from 'material-ui/Typography'

import './ElonLanding.css'

const ElonLanding = () => (
  <div className="ElonLanding">
    {/* <Typography className="ElonLanding-title" variant="display1">
      As recommended by Elon Musk!
    </Typography> */}

    <Typography className="ElonLanding-quote" variant="display1">
      “The future is all… GraphQL.”
    </Typography>

    <a
      href="https://twitter.com/boredelonmusk"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className="ElonLanding-avatar"
        publicId="bored-elon-musk"
        fetchFormat="auto"
        quality="auto"
      />
    </a>
  </div>
)
export default ElonLanding
