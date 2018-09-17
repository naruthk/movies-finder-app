import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Container, Header, Responsive, Modal, Grid, Button, Embed } from 'semantic-ui-react'

// Components
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'
import SectionMovieOverview from '../components/Movies/Overview'
import SectionCast from '../components/Cast'
import SectionCrew from '../components/Crew'
import SectionNews from '../components/News/Section'
import NotFound from '../pages/NotFound'

// Utilties
import authentication from '../utils/authentication'

export default class Details extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.movieid,
      movieNotFound: false,
      details: {},
      cast: [],
      crew: [],
      videos: [],
      news: []
    }
    this.fetchMovieDetailsAndNews = this.fetchMovieDetailsAndNews.bind(this)
    this.fetchCastCrew = this.fetchCastCrew.bind(this)
    this.fetchVideos = this.fetchVideos.bind(this)
  }
  
  componentDidMount() {
    const { tmdb_api_key, tmdb_default_uri } = authentication
    const movieId = this.props.match.params.movieid
    const MOVIE_DETAILS_ENDPOINT = `${tmdb_default_uri}/movie/${movieId}?api_key=${tmdb_api_key}&language=en-US`
    const CAST_CREW_ENDPOINT = `${tmdb_default_uri}/movie/${movieId}/credits?api_key=${tmdb_api_key}&language=en-US`
    const VIDEOS_RELATED_TO_MOVIE_ENDPOINT = `${tmdb_default_uri}/movie/${movieId}/videos?api_key=${tmdb_api_key}&language=en-US`

    this.fetchMovieDetailsAndNews(MOVIE_DETAILS_ENDPOINT)
    this.fetchCastCrew(CAST_CREW_ENDPOINT)
    this.fetchVideos(VIDEOS_RELATED_TO_MOVIE_ENDPOINT)
  }

  fetchMovieDetailsAndNews(movieEndpoint) {
    axios.get(movieEndpoint)
      .then(res => {
        this.setState(() => ({
          details: res.data,
        }), () => {this.fetchNews(res.data.title, authentication)})
      })
      .catch(error => {
        this.setState({ movieNotFound: true })
      })
  }

  fetchCastCrew(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ 
          cast: res.data.cast,
          crew: res.data.crew
        })
      })
  }

  fetchVideos(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ 
          videos: res.data.results
        })
      })
  }

  fetchNews = (title, auth) => {
    const query = title.split(" ").join('+') + "+film"
    const { newsapi_default_uri, newsapi_api_key } = auth
    const endpoint = `${newsapi_default_uri}/everything?q=${query}&apiKey=${newsapi_api_key}`
    axios.get(endpoint)
      .then(res => {
        this.setState({ news: res.data.articles })
      })
  }
  
  render() {
    const { details, videos, cast, crew, news, movieNotFound } = this.state
    
    return (
      (!movieNotFound ? (

        <Responsive>

          <TemplateHeader pageTitle={details.title} >
            <Header as='h1' content={details.title} inverted style={{ fontSize: '4em', fontWeight: 'normal', margin: '1.5em 0 0.5em 0em' }} />
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
                        subheader={`Get all the details about ${details.title}`} />
                      </Grid.Column>
                      <Grid.Column textAlign='right'>
                        {videos.length > 0 && (
                          <Modal trigger={<Button>Play Trailer</Button>} closeIcon basic>
                            <Modal.Header>{details.title} - Trailer</Modal.Header>
                            <Modal.Content>
                              <Embed id={videos[0].key}  placeholder={`https://img.youtube.com/vi/${videos[0].key}/0.jpg`} source='youtube' />
                            </Modal.Content>
                          </Modal>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                
                  <SectionMovieOverview details={details} crew={crew} />

                  <Header as='h2' content='Cast' />

                  <SectionCast cast={cast} />

                  <Header as='h2' content='Crew' />

                  <SectionCrew crew={crew} />

                </Grid.Column>

                <Grid.Column style={{ padding: '3em' }}>
                  <SectionNews 
                    title='Media'
                    subtitle={`All the buzz around ${details.title}`}
                    news={news} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>

          <TemplateFooter />
          
        </Responsive>
      ) : (
        <NotFound movieId={this.state.id}/>
      ))
    );
  }
}

Details.propTypes = {
  id: PropTypes.number.isRequired
}