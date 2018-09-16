import React from 'react'
import { Link } from 'react-router-dom'

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
        <Header as='h2' inverted style={{ margin: '0 0 10px 0'}}>{title}</Header>
        <p style={{ fontSize: '1rem' }}>{description.substr(0,100) + '...'}</p>
          <Button icon labelPosition='right'>Info<Icon name='right arrow' /></Button>
      </div>
    )

    return (
      <Grid.Column textAlign='center'>
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
              <span>{date}</span>
            </Item.Meta>
          </Item.Content>
        </Item>
      </Grid.Column>
    )
  }
}