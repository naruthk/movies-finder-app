import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Container, Divider, Header, List, Responsive, Segment } from 'semantic-ui-react'

// Components
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

// Utilities
import config from '../utils/config'

export default class About extends Component {

  render() {
    const { siteTitle, siteFeatures, author, authorUrl, authorJob } = config
    
    return (
      <Responsive>
        <TemplateHeader>
          <Helmet>
              <title>About - {siteTitle}</title>
          </Helmet>
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
              {Object.keys(siteFeatures).map(function(key, index) {
                return (
                  <List.Item key={index + "-detail"}>
                    <List.Icon name='star' />
                    <List.Content>
                      <List.Header>{key}</List.Header>
                        {siteFeatures[key]}
                    </List.Content>
                  </List.Item>
                )}
              )}
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
                <List.Content>
                  <List.Header><a href={authorUrl}>{author}</a></List.Header>
                  {authorJob}
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