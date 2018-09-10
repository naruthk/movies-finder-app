import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import { Container, Grid, Header, Input, Responsive, Segment, Popup } from 'semantic-ui-react'

import Config from '../utils/app.config'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

import CurrentlyInTheatersSection from '../components/Movies/Grid/Section'
import TrendingThisWeekSection from '../components/Movies/List/Section'
import EntertainmentNewsSection from '../components/News/Section'

import SearchMovies from '../components/Search/SearchWithAutoComplete'
import Banner from '../components/Banner'

import { siteTitle } from '../utils/'

export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      currentlyInTheaters: [],
      trendingMovies: [],
      entertainmentNews: []
    }
  }

  componentDidMount() {
    const { tmdb_api_key, tmdb_default_uri, newsapi_api_key, newsapi_default_uri } = Config

    // Now Playing
    axios.get(`${tmdb_default_uri}/movie/now_playing?api_key=${tmdb_api_key}`)
      .then(res => {
        const currentlyInTheaters = res.data.results
        this.setState({ currentlyInTheaters })
      }
    );

    // Trending Movies This Week
    axios.get(`${tmdb_default_uri}/trending/all/week?api_key=${tmdb_api_key}`)
      .then(res => {
        const trendingMovies = res.data.results
        this.setState({ trendingMovies })
      }
    );

    // Entertainment News
    axios.get(`${newsapi_default_uri}/top-headlines?country=us&category=entertainment&apiKey=${newsapi_api_key}`)
      .then(res => {
        const entertainmentNews = res.data.articles
        this.setState({ entertainmentNews })
      }
    );
  }
  
  render() {

    return (
      <Responsive>
      
        <Helmet>
            <meta charSet="utf-8" />
            <title>{siteTitle}</title>
        </Helmet>

        <TemplateHeader>

          <Segment
            inverted vertical textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }} >
            <Container text>
              <Header inverted
                as='h1'
                content='Movies Finder'
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginTop: '3em',
                }} />
              <Header inverted
                as='h2'
                content='Look up information on a particular movie and TV show!'
                style={{
                  fontSize: '1.7em',
                  fontWeight: 'normal',
                  marginTop: '1.5em',
                  marginBottom: '1.5em'
                }} />

              <SearchMovies />
              
            </Container>
          </Segment>
        
        </TemplateHeader>

        <CurrentlyInTheatersSection 
          title='Currently in Theaters'
          subtitle='Movies currently on show this week'
          content={this.state.currentlyInTheaters} />

        <Banner text={<div><p>{siteTitle} strives to bring you all the latest news and updates for your favorite movies and TV shows.</p>
        <p>Bookmark this site for easy access!</p></div>} />
        
        <Container>
          <Segment vertical>
            <Grid columns='equal' stackable>
              <Grid.Row>

                <TrendingThisWeekSection
                  title='Trending This Week'
                  subtitle={`Find out what's popular this week on IMDB`}
                  buttonTitle='View more on IMDB'
                  buttonIcon='imdb'
                  buttonLink='https://imdb.com'
                  content={this.state.trendingMovies} />

                <EntertainmentNewsSection 
                  title='Entertainment News'
                  subtitle='Get the latest updates as it happens'
                  buttonTitle='Read more on Google News'
                  buttonIcon='google'
                  buttonLink='https://news.google.com'
                  content={this.state.entertainmentNews} />
                
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
        
        <TemplateFooter />
        
      </Responsive>
    );
  }
}