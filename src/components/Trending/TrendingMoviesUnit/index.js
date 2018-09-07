import React from 'react'
import { Link } from 'react-router-dom'
import {
  Item,
  Icon,
} from 'semantic-ui-react'

import Config from '../../../utils/app.config'

class TrendingMoviesUnit extends React.Component {

  render() {

    const { id, imgUrl, title, description, date, vote_average, vote_count } = this.props;
    const { tmdb_image_uri } = Config

    const pushToDetail = { 
      pathname: `/list/${id}`
    };

    return (
      <Item>
        <Link to={pushToDetail}>
          <Item.Image 
            size='tiny'
            src={`${tmdb_image_uri}/${imgUrl}`} 
            style={{margin: '0 10px 0 0'}}
          />
        </Link>
        <Item.Content>
          <Item.Header><Link to={pushToDetail}>{title}</Link></Item.Header>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Icon color='orange' name='calendar' /> <span>{date}</span>
            <Icon color='orange' name='star' /> <span><b>{vote_average}</b> / 10</span>
            <Icon color='orange' name='user' /> <span>{vote_count} Votes</span>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default TrendingMoviesUnit