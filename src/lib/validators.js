import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
} from 'revalidate'

const isString = createValidator(
  (message) => (value) => {
    if (!(typeof value === 'string')) {
      return message
    }
  },
  (field) => `${field} must be a String`
)

export const validateReview = combineValidators({
  text: composeValidators(
    isRequired,
    isString,
    hasLengthLessThan(500)
  )('Review text'),
  stars: createValidator(
    (message) => (value) => {
      if (![null, 1, 2, 3, 4, 5].includes(value)) {
        return message
      }
    },
    (field) => `${field} must be a number 1–5`
  )('Stars'),
})

// validateReview({
//   text: 1,
//   stars: 5
// })
//
// => {text: "Review text must be a String"}

// validateReview({
//   text: 'my review',
//   stars: 'a string'
// })
//
// => {stars: Stars must be a number 1–5`}
