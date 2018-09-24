import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload';

import { Image, Grid, Header, Dimmer, Item, Button, Icon } from 'semantic-ui-react'

import authentication from '../../../../utils/authentication'

export default class MoviesAsGridUnit extends React.Component {
  
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const { id, imgUrl, title, description, date } = this.props;
    const { tmdb_image_uri } = authentication
    const pushToDetail = { 
      pathname: `/list/${id}`
    };

    const content = (
      <div>
        <Header as='h3' inverted style={{ margin: '0 0 10px 0'}}>{title}</Header>
        <p style={{ fontSize: '1rem' }}>{description.substr(0,80) + '...'}</p>
          <Button primary icon labelPosition='right'>Info<Icon name='right arrow' /></Button>
      </div>
    )

    return (
      <LazyLoad height={200}>
        <Grid.Column textAlign='center' mobile={5} tablet={2} computer={2}>
          <Link to={pushToDetail}>
            <Dimmer.Dimmable
              as={Image}
              dimmed={active}
              dimmer={{ active, content }}
              onMouseEnter={this.handleShow}
              onMouseLeave={this.handleHide}
              src={`${tmdb_image_uri}/${imgUrl}`}
            />
          </Link>
          <Item>
            <Item.Content>
              <Item.Meta>
                <span style={{color: 'white'}}>{date}</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Grid.Column>
      </LazyLoad>
    )
  }
}

MoviesAsGridUnit.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}