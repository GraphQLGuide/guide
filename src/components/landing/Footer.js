import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.css'

const Footer = () => (
  <footer className="Footer">
    The GraphQL Guide © {new Date().getFullYear()}
    <Link to="/privacy">Privacy</Link>
    <Link to="/terms">Terms</Link>
  </footer>
)

export default Footer
