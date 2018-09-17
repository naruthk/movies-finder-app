import React, { Component } from 'react'
import axios from 'axios'
import { Container, Grid, Responsive, Segment } from 'semantic-ui-react'

// Components
import Banner from '../components/Banner'
import SectionNowPlaying from '../components/Movies/Grid/Section'
import SectionTrending from '../components/Movies/List/Section'
import SectionNews from '../components/News/Section'
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

// Utilities
import config from '../utils/config'
import authentication from '../utils/authentication'

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
        moviesInTheaters: [],
        moviesTrending: [],
        moviesNews: []
    }
    this.fetchNowPlaying = this.fetchNowPlaying.bind(this)
    this.fetchTrendingMoviesThisWeek = this.fetchTrendingMoviesThisWeek.bind(this)
    this.fetchNews = this.fetchNews.bind(this)
  }

  componentDidMount() {
    const { 
      tmdb_api_key, 
      tmdb_default_uri, 
      newsapi_api_key, 
      newsapi_default_uri } = authentication
    const NOW_PLAYING_ENDPOINT = `${tmdb_default_uri}/movie/now_playing?api_key=${tmdb_api_key}`
    const TRENDING_MOVIES_ENDPOINT = `${tmdb_default_uri}/trending/all/week?api_key=${tmdb_api_key}`
    const NEWS_ENDPOINT = `${newsapi_default_uri}/top-headlines?country=us&category=entertainment&apiKey=${newsapi_api_key}`
    
    this.fetchNowPlaying(NOW_PLAYING_ENDPOINT)
    this.fetchTrendingMoviesThisWeek(TRENDING_MOVIES_ENDPOINT)
    this.fetchNews(NEWS_ENDPOINT)
  }

  fetchNowPlaying(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ moviesInTheaters: res.data.results })
      });
  }

  fetchTrendingMoviesThisWeek(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ moviesTrending: res.data.results })
      });
  }

  fetchNews(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ moviesNews: res.data.articles })
      });
  }
  
  render() {
    return (
      <Responsive>
        <TemplateHeader
          pageTitle={config.siteTitle}
          wrapperCSS={{ padding: '10px 0' }}
          childCSS={{}} >
        </TemplateHeader>

        <SectionNowPlaying 
          title='Currently in Theaters'
          subtitle='Movies currently on show this week'
          movies={this.state.moviesInTheaters} />
        
        <Banner 
          css={{ padding: '1em 0em', margin: '2em 0' }}
          text={<div><p>{config.siteTitle} strives to bring you all the latest news and updates for your favorite movies and TV shows.</p><p>Bookmark this site for easy access!</p></div>} />
        
        <Container>
          <Segment vertical>
            <Grid columns='equal' stackable>
              <Grid.Row>
                <SectionTrending
                  title='Trending This Week'
                  subtitle={`Find out what's popular this week on IMDB`}
                  buttonTitle='View more on IMDB'
                  buttonIcon='imdb'
                  buttonLink='https://imdb.com'
                  movies={this.state.moviesTrending} />
                <SectionNews 
                  title='Entertainment News'
                  subtitle='Get the latest updates as it happens'
                  buttonTitle='Read more on Google News'
                  buttonIcon='google'
                  buttonLink='https://news.google.com'
                  news={this.state.moviesNews} />
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>

        <TemplateFooter />
        
      </Responsive>
    );
  }
}