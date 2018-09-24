import React from 'react'
import PropTypes from 'prop-types';
import { Container, Grid, Header, Segment } from 'semantic-ui-react'
import MoviesAsGridUnit from '../Unit'
import helpers from '../../../../utils/helpers'

export default class MoviesAsGridSection extends React.Component {

  render() {
    const { title, subtitle, movies } = this.props

    return (
      <Segment inverted basic>
        <Container fluid>
          <Container style={{ padding: '3em 0' }}>
            <Header
              inverted
              as='h2'
              content={title}
              subheader={subtitle}
            />
          </Container>
          <Segment vertical style={{ padding: '1em 0'}}>
            <Grid centered>
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
      </Segment>
    )
  }
}

MoviesAsGridSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  movies:  PropTypes.array.isRequired
}