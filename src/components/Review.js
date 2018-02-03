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

  toggleFavorite = () => {}

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
            <Typography className="Review-created">
              {distanceInWordsToNow(createdAt)} ago
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
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    stars: PropTypes.number,
    createdAt: PropTypes.number.isRequired,
    favorited: PropTypes.boolean,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  }).isRequired
}

export default Review
