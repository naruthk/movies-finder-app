import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'

import Config from '../utils/app.config'

import {
  Container,
  Header,
  Responsive,
  Segment,
  List,
  Image,
  Grid,
} from 'semantic-ui-react'

import ExternalLinkButton from '../components/Buttons/ExternalLinkButton'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'
import OverallDetailsSection from '../components/Details/OverallDetailsSection'

import { siteTitle } from '../utils'
import blankPhoto from '../assets/images/white-image.png'

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
      crew: []
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

  }
  
  render() {

    const { tmdb_image_uri } = Config

    return (
      <Responsive>

        <Helmet>
            <meta charSet="utf-8" />
            <title>{this.state.title} | {siteTitle}</title>
        </Helmet>

        <TemplateHeader style={{background: '#000'}}>

          <Segment
            style={{ padding: '1em 0em' }}
            inverted
            basic
          >
            <Container>
              <Header
                as='h1'
                content={this.state.title}
                inverted
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
                      subheader={`Get all the details about ${this.state.title}`}
                    />
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <ExternalLinkButton url={`https://www.imdb.com/${this.state.imdb_id}`} text={`More on IMDB`} icon='imdb' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              
                <OverallDetailsSection content={this.state} />

                <Header
                  as='h2'
                  content='Cast'
                />

                <Grid>
                  {this.state.cast.map((person, index) => {
                      return (
                        <Grid.Column textAlign='center' mobile={4} tablet={4} computer={4}>
                          <List>
                            <List.Item>
                              {person.profile_path && <Image rounded src={`${tmdb_image_uri}/${person.profile_path}`} />}
                              {/* {!person.profile_path && <Image rounded src={blankPhoto} />} */}
                              <List.Content style={{margin: '10px 0 0 0'}}>
                                <List.Header>{person.name}</List.Header>
                                <List.Description>
                                  as {person.character}
                                </List.Description>
                              </List.Content>
                            </List.Item>
                          </List>
                        </Grid.Column>
                      )
                    })}
                </Grid>

                <Header
                  as='h2'
                  content='Crew'
                />

                <Grid>
                  <Grid.Column width={8}>
                    {this.state.crew.slice(0, this.state.crew.length / 2).map((person) => {
                      return (
                        <List>
                          <List.Item>
                            <List.Content style={{margin: '10px 0 0 0'}}>
                              <List.Header>{person.name}</List.Header>
                              <List.Description>
                                {person.job}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                      )
                    })}
                  </Grid.Column>
                  <Grid.Column width={8}>
                    {this.state.crew.slice(this.state.crew.length / 2).map((person) => {
                      return (
                        <List>
                          <List.Item>
                            <List.Content style={{margin: '10px 0 0 0'}}>
                              <List.Header>{person.name}</List.Header>
                              <List.Description>
                                {person.job}
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                      )
                    })}
                  </Grid.Column>
                </Grid>

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