import React from 'react'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'
import config from '../../utils/config'

const { metaData } = config

const disclaimerInformation = `All contents are provided by non-affiliated third parties.`

const dataSources = [
  {
    name: 'The Movie Database (TMDb)',
    href: 'https://www.themoviedb.org/'
  },
  {
    name: 'News API',
    href: 'https://www.newsapi.org'
  }
]

export default () => (
  <Segment inverted vertical style={{ padding: '5em 0', margin: '50px 0 0 0' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={7}>
            <Header inverted as='h4' content='Disclaimer' />
            <p>{metaData.description}</p>
            <p>{disclaimerInformation}</p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Data Sources' />
            <List link inverted>
              {dataSources.map((item, index) => <List.Item key={index} as='a' href={item.href}>{item.name}</List.Item>)}
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as='h4' inverted>Copyrighted 2018</Header>
            <p>Project developed and maintained by <a href="https://www.naruthk.com" target="_blank" rel="noopener noreferrer">Naruth Kongurai</a></p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)