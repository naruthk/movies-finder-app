import React from 'react'
import {
  List,
  Item,
} from 'semantic-ui-react'

class TrendingNewsUnitSmall extends React.Component {
  render() {

    const { imgUrl, title, description, date, source } = this.props;

    return (
      <List.Item href="#" style={{ padding: '1em'}}>
        <Item.Content>
          <List.Header>{title}</List.Header>
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

export default TrendingNewsUnitSmall