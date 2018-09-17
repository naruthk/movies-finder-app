import React from 'react'
import PropTypes from 'prop-types';
import { Button, Container, Grid, Header, Item } from 'semantic-ui-react'

// Components
import ListOfMoviesUnit from '../Unit'
import ExternalLinkButton from '../../../Button/ExternalLinkButton'

export default class ListOfMoviesSection extends React.Component {

  state = {
    loadLimit: 5
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 5 })
  }
  
  render() {
    const { movies, title, subtitle, buttonLink, buttonIcon, buttonTitle } = this.props
    const button = (<ExternalLinkButton url={buttonLink} text={buttonTitle} icon={buttonIcon} />)
    const isReachedLoadLimit = this.state.loadLimit < movies.length

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
        <Item.Group>
          {movies.slice(0, this.state.loadLimit).map((movie, index) => {
            return (
              <ListOfMoviesUnit
                key={index + `-item`}
                {...movie}
              />
            )
          })}
          {isReachedLoadLimit ? (
            <Button attached='bottom' onClick={this.handleClick}>View more</Button>
          ) : (
            <Container textAlign='center' style={{padding: '1.2rem'}}>{button}</Container>
          )}
        </Item.Group>
      </Grid.Column>
    )
  }
}

ListOfMoviesSection.propTypes = {
  movies: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired
}