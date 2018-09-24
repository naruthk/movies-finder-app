import React, { Component } from 'react'
import axios from 'axios'
import { Container, Tab, Grid } from 'semantic-ui-react'
import Layout from '../layouts/main'
import TopTitle from '../components/TopTitle/'
import SectionOverview from '../components/Movies/Overview'
import SectionCast from '../components/Cast/Section/'
import SectionCrew from '../components/Crew/Section/'
import SectionNews from '../components/News/Section/'
import NotFound from '../pages/NotFound'

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
    const { TMDB_API_KEY } = authentication
    const movieId = this.props.match.params.movieid
    const tmdb_uri = 'https://api.themoviedb.org/3'
    const MOVIE_DETAILS_ENDPOINT = `${tmdb_uri}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
    const CAST_CREW_ENDPOINT = `${tmdb_uri}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`
    const VIDEOS_RELATED_TO_MOVIE_ENDPOINT = `${tmdb_uri}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`

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
    const panes = [
      { 
        menuItem: { key: 'cast', icon: 'users', content: 'Cast' },
        render: () => <Tab.Pane><SectionCast cast={cast} /></Tab.Pane> 
      },
      { 
        menuItem: { key: 'crew', icon: 'users', content: 'Crew' },
        render: () => <Tab.Pane><SectionCrew crew={crew} /></Tab.Pane> 
      },
      { 
        menuItem: { key: 'news', icon: 'newspaper', content: 'News' },
        render: () => <Tab.Pane><SectionNews news={news} buttonTitle="Read more on Google News" buttonIcon='google' buttonHref="https://news.google.com/" /></Tab.Pane>
      }
    ]
    
    return (movieNotFound ? ( <NotFound movieId={this.state.id}/> ) : (
      <Layout title={details.title}>
        <TopTitle title={details.title}></TopTitle> 

        <Container>
          <Grid columns='equal' stackable>
            <Grid.Row>

              <SectionOverview 
                details={details}
                crew={crew}
                videos={videos}
                headerTitle='Overview'
                headerSubtitle={`Get all the details about ${details.title}`} />
              
              <Grid.Column style={{ padding: '3em' }}>
                <Tab panes={panes} />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    ))
  }
}