import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'
import FavoriteIcon from 'material-ui-icons/Favorite'
import FavoriteBorderIcon from 'material-ui-icons/FavoriteBorder'
import StarIcon from 'material-ui-icons/Star'
import StarBorderIcon from 'material-ui-icons/StarBorder'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import times from 'lodash/times'
import remove from 'lodash/remove'
import find from 'lodash/find'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'

import { REVIEW_ENTRY, REVIEWS_QUERY } from '../graphql/Review'

const StarRating = ({ rating }) => (
  <div>
    {times(rating, i => <StarIcon key={i} />)}
    {times(5 - rating, i => <StarBorderIcon key={i} />)}
  </div>
)

class Review extends Component {
  state = {
    anchorEl: null,
    deleteConfirmationOpen: false
  }

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  closeMenu = () => {
    this.setState({ anchorEl: null })
  }

  edit = () => {
    this.closeMenu()
  }

  openDeleteConfirmation = () => {
    this.closeMenu()
    this.setState({ deleteConfirmationOpen: true })
  }

  closeDeleteConfirmation = () => {
    this.setState({ deleteConfirmationOpen: false })
  }

  delete = () => {
    this.closeDeleteConfirmation()
    this.props.delete(this.props.review.id).catch(e => {
      if (find(e.graphQLErrors, { message: 'unauthorized' })) {
        alert('👮‍♀️✋ You can only delete your own reviews!')
      }
    })
  }

  toggleFavorite = () => {
    const {
      review: { id, favorited }
    } = this.props
    this.props.favorite(id, !favorited)
  }

  render() {
    const {
      review: { text, stars, createdAt, favorited, author },
      user
    } = this.props

    const linkToProfile = child => (
      <a
        href={`https://github.com/${author.username}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {child}
      </a>
    )

    return (
      <div>
        <Card className="Review">
          <CardHeader
            avatar={linkToProfile(
              <Avatar alt={author.name} src={author.photo} />
            )}
            action={
              user && (
                <IconButton onClick={this.openMenu}>
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={linkToProfile(author.name)}
            subheader={stars && <StarRating rating={stars} />}
          />
          <CardContent>
            {text ? (
              <Typography component="p">{text}</Typography>
            ) : (
              <Typography component="i">Text private</Typography>
            )}
          </CardContent>
          <CardActions>
            <Typography className="Review-created">
              {distanceInWordsToNow(createdAt)} ago
            </Typography>
            <div className="Review-spacer" />
            {user && (
              <IconButton onClick={this.toggleFavorite}>
                {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            )}
          </CardActions>
        </Card>

        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.edit}>Edit</MenuItem>
          <MenuItem onClick={this.openDeleteConfirmation}>Delete</MenuItem>
        </Menu>

        <Dialog
          open={this.state.deleteConfirmationOpen}
          onClose={this.closeDeleteConfirmation}
        >
          <DialogTitle>{'Delete review?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              A better UX is probably just letting you single-click delete with
              an undo toast, but that's harder to code right{' '}
              <span role="img" aria-label="grinning face">
                😄
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDeleteConfirmation}>Cancel</Button>
            <Button onClick={this.delete} color="primary" autoFocus>
              Sudo delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Review.propTypes = {
  review: propType(REVIEW_ENTRY).isRequired,
  favorite: PropTypes.func.isRequired,
  user: PropTypes.object
}

const FAVORITE_REVIEW_MUTATION = gql`
  mutation FavoriteReview($id: ObjID!, $favorite: Boolean!) {
    favoriteReview(id: $id, favorite: $favorite) {
      id
      favorited
    }
  }
`

const READ_USER_FAVORITES = gql`
  query ReadUserFavorites {
    currentUser {
      favoriteReviews {
        id
      }
    }
  }
`

const withFavoriteMutation = graphql(FAVORITE_REVIEW_MUTATION, {
  props: ({ mutate }) => ({
    favorite: (id, favorite) =>
      mutate({
        variables: { id, favorite },
        optimisticResponse: {
          favoriteReview: {
            __typename: 'Review',
            id,
            favorited: favorite
          }
        },
        update: store => {
          const data = store.readQuery({ query: READ_USER_FAVORITES })

          if (favorite) {
            data.currentUser.favoriteReviews.push({ id, __typename: 'Review' })
          } else {
            remove(data.currentUser.favoriteReviews, { id })
          }

          store.writeQuery({ query: READ_USER_FAVORITES, data })
        }
      })
  })
})

const DELETE_REVIEW_MUTATION = gql`
  mutation DeleteReview($id: ObjID!) {
    removeReview(id: $id)
  }
`

const withDeleteMutation = graphql(DELETE_REVIEW_MUTATION, {
  props: ({ mutate }) => ({
    delete: id =>
      mutate({
        variables: { id },
        optimisticResponse: {
          removeReview: true
        },
        update: store => {
          let data = store.readQuery({ query: REVIEWS_QUERY })
          remove(data.reviews, { id })
          store.writeQuery({ query: REVIEWS_QUERY, data })

          data = store.readQuery({ query: READ_USER_FAVORITES })
          remove(data.currentUser.favoriteReviews, { id })
          store.writeQuery({ query: READ_USER_FAVORITES, data })
        }
      })
  })
})

export default compose(withFavoriteMutation, withDeleteMutation)(Review)
