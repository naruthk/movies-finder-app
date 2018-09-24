import React from 'react'
import { Grid, List, Image } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload';
import genericPhoto from '../../../assets/images/basic.png'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export default (props) => (
  <LazyLoad height={200}>
    <Grid.Column textAlign='center' mobile={4} tablet={4} computer={4}>
      <List>
        <List.Item>
          <Image
            rounded
            src={props.person.profile_path ? (`${IMAGE_URL}/${props.person.profile_path}`) : (genericPhoto)} />
          <List.Content style={{margin: '10px 0 0 0'}}>
            <List.Header>{props.person.name}</List.Header>
            <List.Description>
              as {props.person.character}
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Grid.Column>  
  </LazyLoad>
)