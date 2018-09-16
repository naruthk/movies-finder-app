import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Container, Header, Responsive, Segment, Modal, Grid, Button, Embed } from 'semantic-ui-react'

// Components
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'
import SectionMovieOverview from '../components/Movies/Overview'
import SectionMovieCast from '../components/Movies/Cast'
import SectionMovieCrew from '../components/Movies/Crew'
import SectionNews from '../components/News/Section';

// Utilties
import authentication from '../utils/authentication'
import config from '../utils/config'

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
      videos: [],
      news: []
    }
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this)
    this.fetchCastCrew = this.fetchCastCrew.bind(this)
    this.fetchVideos = this.fetchVideos.bind(this)
  }
  
  componentDidMount() {
    this.fetchMovieDetails()
    this.fetchCastCrew()
    this.fetchVideos()
  }

  fetchMovieDetails() {
    const movieId = this.props.match.params.movieid 
    const { tmdb_api_key, tmdb_default_uri } = authentication
    axios.get(`${tmdb_default_uri}/movie/${movieId}?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const movieDetails = res.data
        const genres = movieDetails.genres.map(genre => genre.name);
        this.setState(() => ({
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
        }), () => {this.fetchNews()})
      });
  }

  fetchCastCrew() {
    const movieId = this.props.match.params.movieid
    const { tmdb_api_key, tmdb_default_uri } = authentication
    axios.get(`${tmdb_default_uri}/movie/${movieId}/credits?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const castAndCrewDetails = res.data
        this.setState({ 
          cast: castAndCrewDetails.cast,
          crew: castAndCrewDetails.crew
        })
      });
  }

  fetchVideos() {
    const movieId = this.props.match.params.movieid
    const { tmdb_api_key, tmdb_default_uri } = authentication
    axios.get(`${tmdb_default_uri}/movie/${movieId}/videos?api_key=${tmdb_api_key}&language=en-US`)
      .then(res => {
        const videos = res.data.results
        this.setState({ 
          videos: videos
        })
      });
  }

  fetchNews = () => {
    const { newsapi_default_uri, newsapi_api_key } = authentication
    const movieTitleForQuerying = this.state.title.split(" ").join('+') + "+film"
    axios.get(`${newsapi_default_uri}/everything?q=${movieTitleForQuerying}&apiKey=${newsapi_api_key}`)
      .then(res => {
        const news = res.data.articles
        this.setState({ news })
      });
  }
  
  render() {
    const { title, videos, cast, crew, news } = this.state
    
    return (
      <Responsive>
        <TemplateHeader>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{title} | {config.siteTitle}</title>
          </Helmet>
          <Segment inverted basic>
            <Container>
              <Header inverted
                as='h1'
                content={title}
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
                      subheader={`Get all the details about ${title}`} />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      {videos.length > 0 && (
                        <Modal trigger={<Button>Play Trailer</Button>} closeIcon basic>
                          <Modal.Header>{title} - Trailer</Modal.Header>
                          <Modal.Content>
                            <Embed id={this.state.videos[0].key}  placeholder={`https://img.youtube.com/vi/${videos[0].key}/0.jpg`} source='youtube' />
                          </Modal.Content>
                        </Modal>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              
                <SectionMovieOverview content={this.state} />

                <Header as='h2' content='Cast' />

                <SectionMovieCast cast={cast} />

                <Header as='h2' content='Crew' />

                <SectionMovieCrew crew={crew} />

              </Grid.Column>

              <Grid.Column style={{ padding: '3em' }}>
                <SectionNews 
                  title='Media'
                  subtitle={`All the buzz around ${title}`}
                  news={news} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <TemplateFooter />
        
      </Responsive>
    );
  }
}