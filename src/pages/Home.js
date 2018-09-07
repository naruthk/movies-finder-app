import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import moment from 'moment'

import Config from '../utils/app.config'

import {
  Container,
  Grid,
  Header,
  Input,
  Responsive,
  Segment,
} from 'semantic-ui-react'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

import CurrentlyInTheaters from '../components/CurrentlyInTheatersSection'
import TrendingThisMonth from '../components/Trending/TrendingMoviesSection'
import TrendingNews from '../components/Trending/TrendingNewsSection'

import { siteTitle } from '../utils/'


class Home extends Component {

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

    axios.get(`${tmdb_default_uri}/movie/now_playing?api_key=${tmdb_api_key}`)
      .then(res => {
        const currentlyInTheaters = res.data.results
        this.setState({ currentlyInTheaters })
      }
    );
    // Fetch movies in theaters
    // const dateOneMonthAgo = moment().subtract(30, 'days').format('YYYY-MM-DD')
    // const dateToday = moment().format('YYYY-MM-DD')
    // axios.get(`${tmdb_default_uri}/discover/movie?api_key=${tmdb_api_key}&primary_release_date.gte=${dateOneMonthAgo}&primary_release_date.lte=${dateToday}`)
    //   .then(res => {
    //     const currentlyInTheaters = res.data.results
    //     this.setState({ currentlyInTheaters })
    //   }
    // );

    // Fetch trending movies
    axios.get(`${tmdb_default_uri}/trending/all/week?api_key=${tmdb_api_key}`)
      .then(res => {
        const trendingMovies = res.data.results
        this.setState({ trendingMovies })
      }
    );

    // Fetch entertainment news
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
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Container text>
              <Header
                as='h1'
                content='Movies Finder'
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                }}
              />
              <Header
                as='h2'
                content='Look up information on a particular movie and TV show!'
                inverted
                style={{
                  fontSize: '1.7em',
                  fontWeight: 'normal',
                  marginTop: '1.5em',
                  marginBottom: '1.5em'
                }}
              />
              <Input action='Search' placeholder='Search...' />
            </Container>
          </Segment>
        
        </TemplateHeader>

        <CurrentlyInTheaters content={this.state.currentlyInTheaters} />

        <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em', margin: '2em 0' }}
            vertical
         >
          <Container>
            <p>{siteTitle} strives to bring you all the latest news and updates for your favorite movies and TV shows.</p>
            <p>Bookmark this site for easy access!</p>
          </Container>
         </Segment>
        
        <Segment vertical>
          <Grid columns='equal' stackable>
            <Grid.Row>

              <TrendingThisMonth content={this.state.trendingMovies} />
              <TrendingNews content={this.state.entertainmentNews} />
              
            </Grid.Row>
          </Grid>
        </Segment>

        <TemplateFooter />
        
      </Responsive>
    );
  }
}

export default Home;