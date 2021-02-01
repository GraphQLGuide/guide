import React from 'react'

import Authors from './Authors'
import Topics from './Topics'
// import Testimonials from './Testimonials'
import Stats from './Stats'
import Pricing from './Pricing'
import Links from './Links'

const BelowFold = () => (
  <div className="BelowFold">
    <Authors />
    <Topics />
    {/* <Testimonials /> */}
    <Stats />
    <Pricing />
    <Links />
  </div>
)

export default BelowFold
