import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarInput from 'react-star-rating-component'
import { Button, TextField } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import classNames from 'classnames'
import pick from 'lodash/pick'

import { validateReview } from '../lib/validators'
import { REVIEWS_QUERY, REVIEW_ENTRY } from '../graphql/Review'

const GREY = '#0000008a'

class ReviewForm extends Component {
  constructor(props) {
    super(props)

    const { review } = props

    this.isEditing = !!review

    this.state = {
      text: review ? review.text : '',
      stars: review ? review.stars : null,
      errorText: null
    }
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

    const { review } = this.props

    if (this.isEditing) {
      this.props.editReview(review.id, text, stars)
    } else {
      this.props.addReview(text, stars)
    }

    this.props.done()
  }

  render() {
    return (
      <form
        className={classNames('ReviewForm', { editing: this.isEditing })}
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
            {this.isEditing ? 'Save' : 'Add review'}
          </Button>
        </div>
      </form>
    )
  }
}

ReviewForm.propTypes = {
  done: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }),
  addReview: PropTypes.func.isRequired,
  editReview: PropTypes.func.isRequired,
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    stars: PropTypes.number
  })
}

const ADD_REVIEW_MUTATION = gql`
  mutation AddReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

const withAddReview = graphql(ADD_REVIEW_MUTATION, {
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
          const query = {
            query: REVIEWS_QUERY,
            variables: { skip: 0, limit: 10 }
          }

          const data = store.readQuery(query)
          data.reviews.unshift(newReview)
          store.writeQuery({ ...query, data })
        }
      })
    }
  })
})

const EDIT_REVIEW_MUTATION = gql`
  mutation EditReview($id: ObjID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      text
      stars
    }
  }
`

const withEditReview = graphql(EDIT_REVIEW_MUTATION, {
  props: ({ mutate }) => ({
    editReview: (id, text, stars) => {
      mutate({
        variables: {
          id,
          input: { text, stars }
        },
        optimisticResponse: {
          updateReview: {
            __typename: 'Review',
            id,
            text,
            stars,
            favorite: true
          }
        }
      })
    }
  })
})

export default compose(
  withAddReview,
  withEditReview
)(ReviewForm)
