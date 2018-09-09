import React from 'react'
import moment from 'moment'

import { Button, Container, Grid, Header, Item, List } from 'semantic-ui-react'

import NewsUnit from '../Unit'

import ExternalLinkButton from '../../Buttons/ButtonsWithExternalLink'

export default class NewsSection extends React.Component {

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
    const button = this.props.buttonTitle ? (<ExternalLinkButton url={this.props.buttonLink} text={this.props.buttonTitle} icon={this.props.buttonIcon} />) : null

    return (
      <Grid.Column>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header 
                as='h2'
                content={this.props.title}
                subheader={this.props.subtitle}
              />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              {button}
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Item.Group link>
          <List divided verticalAlign='middle'>
            {results.slice(0, this.state.loadLimit).map((news, index) => {
              return (
                <NewsUnit
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
            {(this.state.loadLimit > results.length) && <Container textAlign='center' style={{padding: '1.2rem'}}>{button}</Container>}

          </List>
        </Item.Group>
      </Grid.Column>
    )
  }
}