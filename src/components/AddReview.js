import React, { useState } from 'react'
import StarInput from 'react-star-rating-component'
import { Button, TextField } from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons'
import { gql, useMutation } from '@apollo/client'
import pick from 'lodash/pick'

import { useUser } from '../lib/useUser'
import { validateReview } from '../lib/validators'
import { REVIEWS_QUERY, REVIEW_ENTRY } from '../graphql/Review'

const GREY = '#0000008a'

const ADD_REVIEW_MUTATION = gql`
  mutation AddReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      ...ReviewEntry
    }
  }
  ${REVIEW_ENTRY}
`

export default ({ done }) => {
  const [text, setText] = useState(),
    [stars, setStars] = useState(),
    [errorText, setErrorText] = useState()

  const { user } = useUser()

  const [addReview] = useMutation(ADD_REVIEW_MUTATION, {
    update: (store, { data: { createReview: newReview } }) => {
      const { reviews } = store.readQuery({
        query: REVIEWS_QUERY,
      })
      store.writeQuery({
        query: REVIEWS_QUERY,
        data: { reviews: [newReview, ...reviews] },
      })
    },
  })

  function handleSubmit(event) {
    event.preventDefault()

    const errors = validateReview({ text, stars })
    if (errors.text) {
      setErrorText(errors.text)
      return
    }

    addReview({
      variables: {
        input: { text, stars },
      },
      optimisticResponse: {
        createReview: {
          __typename: 'Review',
          id: null,
          text,
          stars,
          createdAt: new Date(),
          favorited: false,
          author: pick(user, ['__typename', 'id', 'name', 'photo', 'username']),
        },
      },
    })
    done()
  }

  return (
    <form className="AddReview" autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        className="AddReview-text"
        label="Review text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        helperText={errorText}
        error={!!errorText}
        multiline
        rowsMax="10"
        margin="normal"
        autoFocus={true}
      />

      <StarInput
        className="AddReview-stars"
        starCount={5}
        editing={true}
        value={stars}
        onStarClick={(newStars) => setStars(newStars)}
        renderStarIcon={(currentStar, rating) =>
          currentStar > rating ? <StarBorder /> : <Star />
        }
        starColor={GREY}
        emptyStarColor={GREY}
        name="stars"
      />

      <div className="AddReview-actions">
        <Button className="AddReview-cancel" onClick={done}>
          Cancel
        </Button>

        <Button type="submit" color="primary" className="AddReview-submit">
          Add review
        </Button>
      </div>
    </form>
  )
}
