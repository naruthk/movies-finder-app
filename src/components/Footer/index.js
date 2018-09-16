import React from 'react'
import {
  Container,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react'

import config from '../../utils/config';

const { siteTitle, siteDescription, author, authorUrl, copyright } = config

const TemplateFooter = () => (
  <Segment inverted vertical 
    style={{ padding: '5em 0em', margin: '50px 0 0 0'}} >
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Disclaimer' />
            <p>{siteDescription}</p>
            <p>All contents are provided by non-affiliated third parties.</p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Data Sources' />
            <List link inverted>
              <List.Item as='a' href="https://www.themoviedb.org/">The Movie Database (TMDb)</List.Item>
              <List.Item as='a' href="https://www.newsapi.org">News API</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as='h4' inverted>{copyright} | {siteTitle}</Header>
            <p>Developed by <a href={authorUrl}>{author}</a></p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default TemplateFooter