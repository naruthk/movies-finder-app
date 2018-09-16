import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Container, Grid, Header, Responsive, Segment } from 'semantic-ui-react'

// Components
import Banner from '../components/Banner'
import SectionNowPlaying from '../components/Movies/Grid/Section'
import SectionTrending from '../components/Movies/List/Section'
import SectionNews from '../components/News/Section'
import InputSearchMovies from '../components/Search/AutocompleteSearch'
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

// Utilities
import config from '../utils/config'
import authentication from '../utils/authentication'

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
        currentlyInTheaters: [],
        trendingMovies: [],
        entertainmentNews: []
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
    this.fetchNowPlaying(tmdb_default_uri, tmdb_api_key)
    this.fetchTrendingMoviesThisWeek(tmdb_default_uri, tmdb_api_key)
    this.fetchNews(newsapi_default_uri, newsapi_api_key)
  }

  fetchNowPlaying(tmdb_default_uri, tmdb_api_key) {
    axios.get(`${tmdb_default_uri}/movie/now_playing?api_key=${tmdb_api_key}`)
      .then(res => {
        const currentlyInTheaters = res.data.results
        this.setState({ currentlyInTheaters })
      });
  }

  fetchTrendingMoviesThisWeek(tmdb_default_uri, tmdb_api_key) {
    axios.get(`${tmdb_default_uri}/trending/all/week?api_key=${tmdb_api_key}`)
      .then(res => {
        const trendingMovies = res.data.results
        this.setState({ trendingMovies })
      });
  }

  fetchNews(newsapi_default_uri, newsapi_api_key) {
    axios.get(`${newsapi_default_uri}/top-headlines?country=us&category=entertainment&apiKey=${newsapi_api_key}`)
      .then(res => {
        const entertainmentNews = res.data.articles
        this.setState({ entertainmentNews })
      });
  }
  
  render() {
    return (
      <Responsive>
        <TemplateHeader>
          <Helmet>
              <title>{config.siteTitle} - Welcome</title>
              <meta name="description" content={config.siteDescription} />
          </Helmet>
          <Segment
            inverted vertical textAlign='center'
            style={{ margin: '1.5em 0', padding: '4.5em 0em' }} >
            <Container text>
              <Header 
                as='h1'
                content='Movies Finder'
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal'
                }} />
                
              <InputSearchMovies />

            </Container>
          </Segment>
        </TemplateHeader>

        <SectionNowPlaying 
          title='Currently in Theaters'
          subtitle='Movies currently on show this week'
          movies={this.state.currentlyInTheaters} />
        
        <Banner text={<div><p>{config.siteTitle} strives to bring you all the latest news and updates for your favorite movies and TV shows.</p>
        <p>Bookmark this site for easy access!</p></div>} />
        
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
                  movies={this.state.trendingMovies} />
                <SectionNews 
                  title='Entertainment News'
                  subtitle='Get the latest updates as it happens'
                  buttonTitle='Read more on Google News'
                  buttonIcon='google'
                  buttonLink='https://news.google.com'
                  news={this.state.entertainmentNews} />
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>

        <TemplateFooter />
        
      </Responsive>
    );
  }
}