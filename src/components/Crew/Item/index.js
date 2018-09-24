import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import LazyLoad from 'react-lazyload';

export default (props) => (
  <LazyLoad height={200}>
    <Grid.Column mobile={4} tablet={4} computer={4}>
      <List>
        <List.Item>
          <List.Content style={{margin: '10px'}}>
            <List.Header>{props.person.name}</List.Header>
            <List.Description>
              {props.person.job}
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Grid.Column>
  </LazyLoad>
)