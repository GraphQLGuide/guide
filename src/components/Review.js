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
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'

import { REVIEW_ENTRY } from '../graphql/Review'

const StarRating = ({ rating }) => (
  <div>
    {times(rating, i => <StarIcon key={i} />)}
    {times(5 - rating, i => <StarBorderIcon key={i} />)}
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
    const { review: { text, stars, createdAt, favorited, author } } = this.props

    const linkToProfile = child => (
      <a href={`https://github.com/${author.username}`} target="_blank">
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
                <MoreVertIcon />
              </IconButton>
            }
            title={linkToProfile(author.name)}
            subheader={stars && <StarRating rating={stars} />}
          />
          <CardContent>
            <Typography component="p">{text}</Typography>
          </CardContent>
          <CardActions>
            <Typography type="caption" className="Review-created">
              {distanceInWordsToNow(createdAt)}
            </Typography>
            <div className="Review-spacer" />
            <IconButton onClick={this.toggleFavorite}>
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
  review: propType(REVIEW_ENTRY).isRequired,
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

export default withFavoriteMutation(Review)
