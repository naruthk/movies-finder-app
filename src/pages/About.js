import React from 'react'
import { Container, Divider, Header, List, Segment } from 'semantic-ui-react'
import Layout from '../layouts/main'
import TopTitle from '../components/TopTitle/'

import config from '../utils/config'

const title = 'About'

const PageAbout = () => {
  const { metaData, site } = config

  return (
    <Layout title={title}>

      <TopTitle title={title}></TopTitle>

      <Container style={{ padding: '3em' }}>

        <Header as='h2' content={title} />

        <p style={{fontSize: '1.2rem'}}><b>{metaData.title}</b> is an open-source project developed by Naruth Kongurai. He graduated from the University of Washington in 2018. This web application serves as a point of interest for movie lovers to look up information about their favorite movies and TV shows.</p>
        <p style={{fontSize: '1.2rem'}}>This project is never intended to be a replacement for popular entertainment sites like IMDB, MSN, or Fandango.</p>

        <Divider hidden />

        <Segment>
          <Header as='h3' content='Features' />
          <List>
            {Object.keys(site.features).map(function(key, index) {
              return (
                <List.Item key={index + "-detail"}>
                  <List.Icon name='star' />
                  <List.Content>
                    <List.Header>{key}</List.Header>
                      {site.features[key]}
                  </List.Content>
                </List.Item>
              )}
            )}
          </List>
        </Segment>

        <Divider hidden />

        <Segment>
          <Header as='h3' content='Developer' />
          <List horizontal>
            <List.Item>
              <List.Content>
                <List.Header><a href="https://www.naruthk.com" target="_blank" rel="noopener noreferrer">Naruth Kongurai</a></List.Header>Front End Developer
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
      
    </Layout>
  )
}

export default PageAbout