import React from 'react'
import PropTypes from 'prop-types';
import { Header, Button, Container, Grid, Item, List } from 'semantic-ui-react'
import ExternalLinkButton from '../../Button/ExternalLinkButton'
import NewsItem from '../Item'

export default class NewsSection extends React.Component {

  state = {
    loadLimit: 7
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 4 })
  }

  render() {
    const { news, buttonHref, buttonIcon, buttonTitle } = this.props
    const button = buttonTitle ? (<ExternalLinkButton url={buttonHref} text={buttonTitle} icon={buttonIcon} />) : null
    const isReachedLoadLimit = this.state.loadLimit < news.length

    return (
      <Grid.Column>
        <Header
          as='h2'
          content={this.props.title}
          subheader={this.props.subtitle}
        />
        <Item.Group link>
          <List divided verticalAlign='middle'>

            {news.slice(0, this.state.loadLimit).map((news, index) => <NewsItem key={index + `-item`} {...news} />)}

            {isReachedLoadLimit ? (<Button attached='bottom' onClick={this.handleClick}>View more</Button>) : (<Container textAlign='center' style={{padding: '1.2rem'}}>{button}</Container>)}

          </List>
        </Item.Group>
      </Grid.Column>
    )
  }
}

NewsSection.propTypes = {
  news: PropTypes.array.isRequired,
  buttonLink: PropTypes.string,
  buttonIcon: PropTypes.string,
  buttonTitle: PropTypes.string
}