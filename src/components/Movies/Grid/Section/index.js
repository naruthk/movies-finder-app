import React from 'react'
import PropTypes from 'prop-types';
import { Container, Grid, Header, Segment } from 'semantic-ui-react'

// Components
import MoviesAsGridUnit from '../Unit'

// Utilities
import helpers from '../../../../utils/helpers'

export default class MoviesAsGridSection extends React.Component {

  render() {
    const { title, subtitle, movies } = this.props

    return (
      <Container fluid>
        <Container style={{ padding: '3em' }}>
          <Header
            as='h2'
            content={title}
            subheader={subtitle}
          />
        </Container>
        <Segment vertical style={{ padding: '2em 0'}}>
          <Grid doubling columns={5}>
            {movies.map((movie, index) => {
              const title = movie.original_title ? movie.original_title : movie.original_name
              const date = movie.release_date ? movie.release_date : movie.first_air_date
              return (
                <MoviesAsGridUnit
                  key={index + `-item`}
                  id={movie.id}
                  imgUrl={movie.poster_path}
                  title={title}
                  description={movie.overview}
                  date={helpers.createReadableDate(date)}
                />
              )
            })}
          </Grid>
        </Segment>
      </Container>
    )
  }
}

MoviesAsGridUnit.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  movies:  PropTypes.string.isRequired
}