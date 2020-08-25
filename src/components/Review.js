import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core'
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
} from '@material-ui/icons'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import times from 'lodash/times'
import { gql, useMutation } from '@apollo/client'

const FAVORITE_REVIEW_MUTATION = gql`
  mutation FavoriteReview($id: ObjID!, $favorite: Boolean!) {
    favoriteReview(id: $id, favorite: $favorite) {
      id
      favorited
    }
  }
`

const FavoriteButton = ({ id, favorited }) => {
  const [favorite] = useMutation(FAVORITE_REVIEW_MUTATION)

  function toggleFavorite() {
    favorite({
      variables: { id, favorite: !favorited },
      optimisticResponse: {
        favoriteReview: {
          __typename: 'Review',
          id,
          favorited: !favorited,
        },
      },
    })
  }

  return (
    <IconButton onClick={toggleFavorite}>
      {favorited ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  )
}

const StarRating = ({ rating }) => (
  <div>
    {times(rating, (i) => (
      <Star key={i} />
    ))}
    {times(5 - rating, (i) => (
      <StarBorder key={i} />
    ))}
  </div>
)

export default ({ review }) => {
  const { text, stars, createdAt, author } = review

  const [anchorEl, setAnchorEl] = useState()

  function openMenu(event) {
    setAnchorEl(event.currentTarget)
  }

  function closeMenu() {
    setAnchorEl(null)
  }

  function editReview() {
    closeMenu()
  }

  function deleteReview() {
    closeMenu()
  }

  const LinkToProfile = ({ children }) => (
    <a
      href={`https://github.com/${author.username}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )

  return (
    <div>
      <Card className="Review">
        <CardHeader
          avatar={
            <LinkToProfile>
              <Avatar alt={author.name} src={author.photo} />
            </LinkToProfile>
          }
          action={
            <IconButton onClick={openMenu}>
              <MoreVert />
            </IconButton>
          }
          title={<LinkToProfile>{author.name}</LinkToProfile>}
          subheader={stars && <StarRating rating={stars} />}
        />
        <CardContent>
          <Typography component="p">{text}</Typography>
        </CardContent>
        <CardActions>
          <Typography className="Review-created">
            {formatDistanceToNow(createdAt)} ago
          </Typography>
          <div className="Review-spacer" />
          <FavoriteButton {...review} />
        </CardActions>
      </Card>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem onClick={editReview}>Edit</MenuItem>
        <MenuItem onClick={deleteReview}>Delete</MenuItem>
      </Menu>
    </div>
  )
}
