import React from 'react'
import { Item, Image, List } from 'semantic-ui-react'
import moment from 'moment'

export default class NewsUnit extends React.Component {

  render() {
    const { urlToImage, title, url, publishedAt, source } = this.props;
    
    return (
      <List.Item href={url} style={{ padding: '1em'}}>
        <Item.Content>
          <Image rounded size='tiny' src={urlToImage} floated='left'/>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>
            <List divided horizontal>
              <List.Item>
                <List.Content>
                  <List.Description>{source.name}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Description>{moment(publishedAt).startOf('day').fromNow()}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Item.Meta>
        </Item.Content>
      </List.Item>
    )
  }
}