import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Email from './email'

class SubscribeForm extends React.Component {
  static propTypes = {
    mutate: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.state = {
      open: false,
      error: '',
    }
  }

  onClick() {
    const address = this.formEmail.state.value
    this.props.mutate({ variables: { email: address } })
      .then(({ data }) => {
        this.formEmail.setState({ value: '' })
        this.setState({ error: '' })
        this.handleOpen()
      })
      .catch((error) => {
        this.setState({ error: error.graphQLErrors[0].data.reason })
      })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    return (
      <form
        style={{
          margin: '10px 0 40px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
        <div>
          <p>{this.state.error}</p>
        </div>
        <Email
          className="form-control"
          ref={(email) => {
            this.formEmail = email
          }}
          autoFocus
          />
        <RaisedButton
          label="Get early access"
          onClick={this.onClick}
          primary
          style={{
            marginTop: 20,
          }}
          />
        <Dialog
          title="You will hear from us soon!"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          />
      </form>
    )
  }
}

const subscribe = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email) {
      email
    }
  }
`

export default graphql(subscribe)(SubscribeForm)
