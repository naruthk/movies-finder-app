import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Item, Icon } from 'semantic-ui-react'

// Utilities
import authentication from '../../../../utils/authentication'

export default class ListOfMoviesUnit extends React.Component {

  render() {
    const { id, poster_path, original_title, original_name, overview, release_date, first_air_date, vote_average, vote_count, imgSize } = this.props;
    const title = original_title ? original_title : original_name
    const date = release_date ? release_date : first_air_date
    const { tmdb_image_uri } = authentication
    const pushToDetail = { 
      pathname: `/list/${id}`
    };
    
    return (
      <Item>
        <Link to={pushToDetail}>
          <Item.Image 
            size={imgSize ? imgSize : 'tiny'}
            src={`${tmdb_image_uri}/${poster_path}`} 
            style={{margin: '0 10px 0 0'}}
          />
        </Link>
        <Item.Content>
          <Item.Header><Link to={pushToDetail}>{title}</Link></Item.Header>
          {overview && <Item.Description>{overview}</Item.Description>}
          <Item.Extra>
            <Icon color='orange' name='calendar' /> <span>{moment(date).format('MMMM Do YYYY')}</span>
            <Icon color='orange' name='star' /> <span><b>{vote_average}</b> / 10</span>
            <Icon color='orange' name='user' /> <span>{vote_count} Votes</span>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

ListOfMoviesUnit.propTypes = {
  id: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  original_title: PropTypes.string.isRequired,
  original_name: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  first_air_date: PropTypes.string.isRequired,
  vote_average: PropTypes.string.isRequired,
  vote_count: PropTypes.string.isRequired,
  imgSize: PropTypes.string.isRequired,
}