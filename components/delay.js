import { Component, PropTypes } from 'react'

class Delay extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    ms: PropTypes.number.isRequired, // eslint-disable-line
    initial: PropTypes.bool.isRequired,
  }

  state = {
    value: this.props.initial,
  }

  componentDidMount() {
    this.refresh(this.props)
  }

  componentWillReceiveProps(props) {
    this.refresh(props)
  }

  refresh({ value, ms }) {
    setTimeout(() => this.setState({
      value,
    }), ms)
  }

  render() {
    return this.props.children(this.state.value)
  }
}

export default Delay
