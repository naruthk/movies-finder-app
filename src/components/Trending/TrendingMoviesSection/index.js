import React from 'react'
import moment from 'moment'

import {
  Button,
  Container,
  Grid,
  Header,
  Item,
} from 'semantic-ui-react'

import TrendingMoviesUnit from '../TrendingMoviesUnit'
import ExternalLinkButton from '../../Buttons/ExternalLinkButton'

class TrendingMoviesSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadLimit: 5
    }
  }
  
  handleClick = (e) => {
    const { loadLimit } = this.state
    this.setState({ loadLimit: loadLimit + 5 })
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
                content='Trending This Week'
                subheader={`Find out what's popular this week on IMDB`}
              />
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <ExternalLinkButton text='View more on IMDB' icon='imdb' url='https://imdb.com' />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Item.Group>
          {results.slice(0, this.state.loadLimit).map((movie, index) => {
            const title = movie.original_title ? movie.original_title : movie.original_name
            const date = movie.release_date ? movie.release_date : movie.first_air_date
            return (
              <TrendingMoviesUnit
                key={index + `-item`}
                id={movie.id}
                imgUrl={movie.poster_path}
                title={title}
                description={movie.overview}
                date={moment(date).format('MMMM Do YYYY')}
                vote_average={movie.vote_average}
                vote_count={movie.vote_count}
              />
            )
          })}

          {(this.state.loadLimit < results.length) && <Button attached='bottom' onClick={this.handleClick}>View more</Button>}

          {(this.state.loadLimit >= results.length) && <Container textAlign='center' style={{padding: '1.2rem'}}><ExternalLinkButton text='View more on IMDB' url='https://imdb.com' icon='imdb' /></Container>}

          </Item.Group>
      </Grid.Column>
    )
  }
}

export default TrendingMoviesSection