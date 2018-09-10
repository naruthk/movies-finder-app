import React from 'react'
import moment from 'moment'

import { Container, Grid, Header, Segment } from 'semantic-ui-react'

import MoviesAsGridUnit from '../Unit'

export default class MoviesAsGridSection extends React.Component {
  
  render() {
    const results = this.props.content
    
    return (
      <Container fluid>

        <Container style={{ padding: '3em' }}>
          <Header
            as='h2'
            content={this.props.title}
            subheader={this.props.subtitle}
          />
        </Container>

        <Segment vertical style={{ padding: '2em 0'}}>

          <Grid doubling columns={5}>
            {results.map((movie, index) => {
              const title = movie.original_title ? movie.original_title : movie.original_name
              const date = movie.release_date ? movie.release_date : movie.first_air_date
              return (
                <MoviesAsGridUnit
                  key={index + `-item`}
                  id={movie.id}
                  imgUrl={movie.poster_path}
                  title={title}
                  description={movie.overview}
                  date={moment(date).format('MMMM Do YYYY')}
                />
              )
            })}
          </Grid>

        </Segment>

      </Container>
    )
  }
}