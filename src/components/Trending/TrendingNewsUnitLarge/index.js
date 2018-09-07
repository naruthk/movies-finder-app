import React from 'react'
import {
  Item,
  Image,
  List,
} from 'semantic-ui-react'

class TrendingNewsUnitLarge extends React.Component {
  render() {

    const { imgUrl, title, url, date, source } = this.props;

    return (
      <List.Item href={url} style={{ padding: '1em'}}>
        <Item.Content>
          <Image rounded size='tiny' src={imgUrl} floated='left'/>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>
            <List divided horizontal>
              <List.Item>
                <List.Content>
                  <List.Description>{source}</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <List.Description>{date}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Item.Meta>
        </Item.Content>
      </List.Item>
    )
  }
}

export default TrendingNewsUnitLarge