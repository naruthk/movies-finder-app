import React from 'react'
import moment from 'moment'

import {
  Button,
  Container,
  Grid,
  Header,
  Item,
  List,
} from 'semantic-ui-react'

import TrendingNewsUnitLarge from '../TrendingNewsUnitLarge'
import ExternalLinkButton from '../../Buttons/ExternalLinkButton'

class TrendingNewsSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadLimit: 7
    }
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 4 })
  }

  render() {

    const results = this.props.content

    return (
      <Grid.Column style={{ padding: '3em' }}>

        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header 
                as='h2'
                content='Entertainment News'
                subheader={`Get the latest updates as it happens`}
              />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <ExternalLinkButton url="https://news.google.com" text='Read more on Google News' icon='google' />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Item.Group link>
          <List divided verticalAlign='middle'>

            {results.slice(0, this.state.loadLimit).map((news, index) => {
              return (
                <TrendingNewsUnitLarge
                  key={index + `-item`}
                  imgUrl={news.urlToImage}
                  title={news.title}
                  description={news.description}
                  date={moment(news.publishedAt).startOf('day').fromNow()}
                  source={news.source.name}
                  url={news.url}
                />
              )
            })}

            {(this.state.loadLimit < results.length) && <Button attached='bottom' onClick={this.handleClick}>View more</Button>}
            {(this.state.loadLimit > results.length) && <Container textAlign='center' style={{padding: '1.2rem'}}><ExternalLinkButton url="https://news.google.com" text='Read more on Google News' icon='google' /></Container>}

          </List>
        </Item.Group>
      </Grid.Column>
    )
  }
}

export default TrendingNewsSection