import { PropTypes } from 'react'

const LogoLI = ({ name, children }) => (
  <div
    style={{
      flex: 1,
      height: '100%',
      margin: 10,
      textAlign: 'center',
      padding: 10,
    }}
    >
    <div className="logo">
      {children}
    </div>
    <div>
      {name}
    </div>
  </div>
)


LogoLI.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
}

export default LogoLI
