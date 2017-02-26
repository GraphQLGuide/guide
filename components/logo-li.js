import { PropTypes } from 'react'

const LogoLI = ({ name, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: 20,
      borderRadius: 20,
    }}
    className="logo"
    >
    <div className="svg-wrapper">
      {children}
    </div>
    <div
      style={{
        color: '#737373',
        marginTop: 10,
      }}
      >
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
