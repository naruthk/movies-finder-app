import React from 'react'
import moment from 'moment'

import {
  Container,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'

import CurrentlyInTheatersUnit from '../CurrentlyInTheatersUnit'

class CurrentlyInTheatersSection extends React.Component {

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
      <Container fluid>

        <Container style={{ padding: '3em' }}>
          <Header
            as='h2'
            content='Currently in Theaters'
            subheader={`Movies currently on show this week`}
          />
        </Container>

        <Segment vertical style={{ padding: '2em 0'}}>

          <Grid doubling columns={5}>

            {results.map((movie, index) => {
              const title = movie.original_title ? movie.original_title : movie.original_name
              const date = movie.release_date ? movie.release_date : movie.first_air_date
              return (
                <CurrentlyInTheatersUnit
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

export default CurrentlyInTheatersSection