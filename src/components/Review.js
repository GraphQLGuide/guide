import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder
} from '@material-ui/icons'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import times from 'lodash/times'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const StarRating = ({ rating }) => (
  <div>
    {times(rating, i => (
      <Star key={i} />
    ))}
    {times(5 - rating, i => (
      <StarBorder key={i} />
    ))}
  </div>
)

class Review extends Component {
  state = {
    anchorEl: null
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

  delete = () => {
    this.closeMenu()
  }

  toggleFavorite = () => {
    const { review: { id, favorited } } = this.props
    this.props.favorite(id, !favorited)
  }

  render() {
    const {
      review: { text, stars, createdAt, favorited, author }
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
              <IconButton onClick={this.openMenu}>
                <MoreVert />
              </IconButton>
            }
            title={linkToProfile(author.name)}
            subheader={stars && <StarRating rating={stars} />}
          />
          <CardContent>
            <Typography component="p">{text}</Typography>
          </CardContent>
          <CardActions>
            <Typography className="Review-created">
              {distanceInWordsToNow(createdAt)} ago
            </Typography>
            <div className="Review-spacer" />
            <IconButton onClick={this.toggleFavorite}>
              {favorited ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </CardActions>
        </Card>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.edit}>Edit</MenuItem>
          <MenuItem onClick={this.delete}>Delete</MenuItem>
        </Menu>
      </div>
    )
  }
}

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    stars: PropTypes.number,
    createdAt: PropTypes.number.isRequired,
    favorited: PropTypes.bool,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  }).isRequired,
  favorite: PropTypes.func.isRequired
}

const FAVORITE_REVIEW_MUTATION = gql`
  mutation FavoriteReview($id: ObjID!, $favorite: Boolean!) {
    favoriteReview(id: $id, favorite: $favorite) {
      id
      favorited
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
        }
      })
  })
})

export default withFavoriteMutation(Review)
