import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Layout from '../layouts/main'
import TopTitle from '../components/TopTitle/'

const title = `Page not found`

const description = (`<div><p style={{fontSize: '1.2rem'}}>We were unable to find information for this particular content.</p>
<p style={{fontSize: '1.2rem'}}>Please contact the <a href='mailto:nkongurai@gmail.com'>administrator</a>.</p></div>`)

export default () => (
  <Layout title={title}>
    <TopTitle title={title}></TopTitle> 
    <Container style={{ padding: '3em' }}>
      <Header as='h2' content='Unable to lookup content' />
      <div dangerouslySetInnerHTML={{__html: description}}></div>
    </Container>
  </Layout>
)