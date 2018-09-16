import React from 'react'
import { Container, Grid, List, Image, Button } from 'semantic-ui-react'

import authentication from '../../../utils/authentication'
import blankPhoto from '../../../assets/images/white-image.png'

export default class MovieCastSection extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadLimit: 4
    }
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 4 })
  }

  render() {
    const { tmdb_image_uri } = authentication
    const result = this.props.cast

    return (
      <Grid>
        {result.slice(0, this.state.loadLimit).map((person, index) => {
          return (
            <Grid.Column textAlign='center' mobile={4} tablet={4} computer={4} key={index + "-item"}>
              <List>
                <List.Item>
                  {person.profile_path && <Image rounded src={`${tmdb_image_uri}/${person.profile_path}`} />}
                  {!person.profile_path && <Image rounded src={blankPhoto} />}
                  <List.Content style={{margin: '10px 0 0 0'}}>
                    <List.Header>{person.name}</List.Header>
                    <List.Description>
                      as {person.character}
                    </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          )
        })}
        <Container fluid>
          {(this.state.loadLimit < result.length) && <Button attached='bottom' onClick={this.handleClick}>Load more cast</Button>}
        </Container>
      </Grid>
    )
  }
}