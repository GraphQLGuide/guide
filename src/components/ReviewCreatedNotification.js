import React, { Component } from 'react'
import { Subscription } from 'react-apollo'
import Snackbar from '@material-ui/core/Snackbar'

import { ON_REVIEW_CREATED_SUBSCRIPTION } from '../graphql/Review'

class ReviewCreatedNotification extends Component {
  state = {
    isOpen: false
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  open = () => {
    this.setState({ isOpen: true })
    setTimeout(this.close, 5000)
  }

  render() {
    return (
      <Subscription
        subscription={ON_REVIEW_CREATED_SUBSCRIPTION}
        onSubscriptionData={this.open}
      >
        {({ data }) =>
          data && data.reviewCreated ? (
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              open={this.state.isOpen}
              onClose={this.close}
              message={`New review from ${data.reviewCreated.author.name}: ${
                data.reviewCreated.text
              }`}
            />
          ) : null
        }
      </Subscription>
    )
  }
}

export default ReviewCreatedNotification
