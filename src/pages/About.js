import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import {
  Container,
  Divider,
  Header,
  Image,
  List,
  Responsive,
  Segment,
} from 'semantic-ui-react'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

import { siteTitle } from '../utils'

import jenny from '../assets/images/jenny.jpg';

class About extends Component {
  
  render() {

    return (
      <Responsive>

        <Helmet>
            <meta charSet="utf-8" />
            <title>About - {siteTitle}</title>
        </Helmet>

        <TemplateHeader>

          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
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
                  margin: '1.5em 0em'
                }}
              />
            </Container>
          </Segment>
                
        </TemplateHeader>

        <Container style={{ padding: '3em' }}>
          <Header
            as='h2'
            content='About This Website'
          />
          <p style={{fontSize: '1.2rem'}}><b>Movies Finder</b> is an open-source project developed by Naruth Kongurai, a graduate of University of Washington. This web application serves as a point of interest for movie lovers to look up information about their favorite movies and TV shows.</p>
          <p style={{fontSize: '1.2rem'}}>This project is never intended to be a replacement for popular entertainment sites like IMDB, MSN, or Fandango.</p>
          
          <Divider hidden />

          <Segment>
            <Header
              as='h3'
              content='Features'
            />
            <List>
              <List.Item>
                <List.Icon name='search' />
                <List.Content>
                  <List.Header>Easy Content Lookup</List.Header>
                  <List.Description>Designed to make searching for your favorite content easier than ever</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='check' />
                <List.Content>
                  <List.Header>Multiple Sources</List.Header>
                  <List.Description>Search for movies and shows from The Movie Database (TMDb), Twitter, YouTube, and Google</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='bolt' />
                <List.Content>
                  <List.Header>Trending Movies</List.Header>
                  <List.Description>Never miss the latest and upcoming movies anymore</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='gem' />
                <List.Content>
                  <List.Header>Entertainment News</List.Header>
                  <List.Description>Latest news from the entertainment industry</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' />
                <List.Content>
                  <List.Header>Open Source</List.Header>
                  <List.Description>{siteTitle} is available for developers to collaborate and anyone to use for free of charge.</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Segment>

          <Divider hidden />

          <Segment>
            <Header
              as='h3'
              content='Developer'
            />
            <List horizontal>
              <List.Item>
                <Image avatar src={jenny}  />
                <List.Content>
                  <List.Header>Naruth Kongurai</List.Header>
                  Frontend Developer
                </List.Content>
              </List.Item>
            </List>
          </Segment>
        </Container>
      
        <TemplateFooter />
        
      </Responsive>
    );
  }
}

export default About;