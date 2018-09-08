import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import { Container, Header, Responsive, Segment, Modal, Grid, Button, Embed } from 'semantic-ui-react'

import Config from '../utils/app.config'
import { siteTitle } from '../utils'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

import MovieOverviewSection from '../components/Movies/Overview'
import MovieCastSection from '../components/Movies/Cast'
import MovieCrewSection from '../components/Movies/Crew'

export default class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.movieid,
      imdb_id: '',
      title: '',
      budget: '',
      genres: [],
      overview: '',
      poster: '',
      backdrop: '',
      release_date: '',
      revenue: '',
      runtime: '',
      vote_average: '',
      vote_count: '',
      cast: [],
      crew: [],
      videos: []
    }
  }
  
  componentDidMount() {
    const { tmdb_api_key, tmdb_default_uri } = Config
    const movieId = this.props.match.params.movieid 

    // Get movie details
    axios.get(`${tmdb_default_uri}/movie/${movieId}?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const movieDetails = res.data
        const genres = movieDetails.genres.map(genre => genre.name);

        this.setState({
          imdb_id: movieDetails.imdb_id,
          title: movieDetails.title,
          overview: movieDetails.overview,
          budget: movieDetails.budget,
          genres: genres,
          poster: movieDetails.poster_path,
          backdrop: movieDetails.backdrop_path,
          release_date: movieDetails.release_date,
          revenue: movieDetails.revenue,
          runtime: movieDetails.runtime,
          vote_average: movieDetails.vote_average,
          vote_count: movieDetails.vote_count
         })
      }
    );

    // Get cast & crew details
    axios.get(`${tmdb_default_uri}/movie/${movieId}/credits?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const castAndCrewDetails = res.data
        this.setState({ 
          cast: castAndCrewDetails.cast,
          crew: castAndCrewDetails.crew
        })
      }
    );

    // Get videos from The Movie Database
    axios.get(`${tmdb_default_uri}/movie/${movieId}/videos?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const videos = res.data.results
        this.setState({ 
          videos: videos
        })
      }
    );
  }
  
  render() {

    return (
      <Responsive>

        <Helmet>
            <meta charSet="utf-8" />
            <title>{this.state.title} | {siteTitle}</title>
        </Helmet>

        <TemplateHeader>
          <Segment inverted basic>
            <Container>
              <Header inverted
                as='h1'
                content={this.state.title}
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  margin: '1.5em 0 0.5em 0em'
                }}
              />
            </Container>
          </Segment>
        </TemplateHeader>

        <Container>
          <Grid columns='equal' stackable>
            <Grid.Row>
              <Grid.Column style={{ padding: '3em' }}>

                <Grid divided='vertically'>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                    <Header
                      as='h2'
                      content='Overview'
                      subheader={`Get all the details about ${this.state.title}`} />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      {this.state.videos.length > 0 && (
                        <Modal trigger={<Button>Play Trailer</Button>} closeIcon basic>
                          <Modal.Header>{this.state.title} - Trailer</Modal.Header>
                          <Modal.Content>
                            <Embed id={this.state.videos[0].key}  placeholder={`https://img.youtube.com/vi/${this.state.videos[0].key}/0.jpg`} source='youtube' />
                          </Modal.Content>
                        </Modal>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              
                <MovieOverviewSection content={this.state} />

                <Header as='h2' content='Cast' />
                <MovieCastSection cast={this.state.cast} />

                <Header as='h2' content='Crew' />
                <MovieCrewSection crew={this.state.crew} />

              </Grid.Column>

              <Grid.Column style={{ padding: '3em' }}>
                <Header
                  as='h2'
                  content='Media'
                  subheader={`All the buzz around ${this.state.title}`}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <TemplateFooter />
        
      </Responsive>
    );
  }
}