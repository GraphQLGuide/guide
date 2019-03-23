import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarInput from 'react-star-rating-component'
import { Button, TextField } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import pick from 'lodash/pick'

import { validateReview } from '../lib/validators'
import { REVIEWS_QUERY, REVIEW_ENTRY } from '../graphql/Review'

const GREY = '#0000008a'

class AddReview extends Component {
  state = {
    text: '',
    stars: null,
    errorText: null
  }

  updateText = event => {
    this.setState({ text: event.target.value })
  }

  updateStars = stars => {
    this.setState({ stars })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { text, stars } = this.state

    const errors = validateReview({ text, stars })
    if (errors.text) {
      this.setState({ errorText: errors.text })
      return
    }

    this.props.addReview(text, stars)

    this.props.done()
  }

  render() {
    return (
      <form
        className="AddReview"
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          className="AddReview-text"
          label="Review text"
          value={this.state.text}
          onChange={this.updateText}
          helperText={this.state.errorText}
          error={!!this.state.errorText}
          multiline
          rowsMax="10"
          margin="normal"
          autoFocus={true}
        />

        <StarInput
          className="AddReview-stars"
          starCount={5}
          editing={true}
          value={this.state.stars}
          onStarClick={this.updateStars}
          renderStarIcon={(currentStar, rating) =>
            currentStar > rating ? <StarBorder /> : <Star />
          }
          starColor={GREY}
          emptyStarColor={GREY}
          name="stars"
        />

        <div className="AddReview-actions">
          <Button className="AddReview-cancel" onClick={this.props.done}>
            Cancel
          </Button>

          <Button type="submit" color="primary" className="AddReview-submit">
            Add review
          </Button>
        </div>
      </form>
    )
  }
}

AddReview.propTypes = {
  done: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired,
  addReview: PropTypes.func.isRequired
}

const ADD_REVIEW_MUTATION = gql`
  mutation AddReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

const withMutation = graphql(ADD_REVIEW_MUTATION, {
  props: ({ ownProps: { user }, mutate }) => ({
    addReview: (text, stars) => {
      mutate({
        variables: {
          input: { text, stars }
        },
        optimisticResponse: {
          createReview: {
            __typename: 'Review',
            id: null,
            text,
            stars,
            createdAt: new Date(),
            favorited: false,
            author: pick(user, [
              '__typename',
              'id',
              'name',
              'photo',
              'username'
            ])
          }
        },
        update: (store, { data: { createReview: newReview } }) => {
          const data = store.readQuery({
            query: REVIEWS_QUERY
          })
          data.reviews.unshift(newReview)
          store.writeQuery({ query: REVIEWS_QUERY, data })
        }
      })
    }
  })
})

export default withMutation(AddReview)
