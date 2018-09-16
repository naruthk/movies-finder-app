import React from 'react'
import { Button, Container, Grid, Header, Item, List } from 'semantic-ui-react'

// Components
import NewsUnit from '../Unit'
import ExternalLinkButton from '../../Buttons/ButtonsWithExternalLink'

export default class NewsSection extends React.Component {

  state = {
    loadLimit: 7
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 4 })
  }

  render() {
    const { news, title, subtitle, buttonLink, buttonIcon, buttonTitle} = this.props
    const button = buttonTitle ? (<ExternalLinkButton url={buttonLink} text={buttonTitle} icon={buttonIcon} />) : null
    const isReachedLoadLimit = this.state.loadLimit < news.length

    return (
      <Grid.Column>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header 
                as='h2'
                content={title}
                subheader={subtitle}
              />
            </Grid.Column>
            <Grid.Column textAlign='right'>{button}</Grid.Column>
          </Grid.Row>
        </Grid>

        <Item.Group link>
          <List divided verticalAlign='middle'>
            {news.slice(0, this.state.loadLimit).map((news, index) => {
              return (
                <NewsUnit
                  key={index + `-item`}
                  {...news}
                />
              )
            })}

            {isReachedLoadLimit ? (
              <Button attached='bottom' onClick={this.handleClick}>View more</Button>
            ) : (
              <Container textAlign='center' style={{padding: '1.2rem'}}>{button}</Container>
            )}

          </List>
        </Item.Group>
      </Grid.Column>
    )
  }
}