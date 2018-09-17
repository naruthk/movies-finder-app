import React from 'react'
import { Container, Header, Responsive } from 'semantic-ui-react'

// Components
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

const NotFound = (props) => {
  // const movieId = props.movieId
  return (
    <Responsive>
      <TemplateHeader
        pageTitle='Not Found'
        wrapperCSS={{ padding: '1em 0em' }}
      >
        <Header 
          as='h1'
          content='Not Found'
          inverted style={{ fontSize: '4em', fontWeight: 'normal', margin: '1.5em 0em' }} />
      </TemplateHeader>

      <Container style={{ padding: '3em' }}>
        <Header as='h2' content='Unable to lookup content' />
        <p style={{fontSize: '1.2rem'}}>We were unable to find information for this particular content.</p>
        <p style={{fontSize: '1.2rem'}}>Please contact the <a href='mailto:nkongurai@gmail.com'>administrator</a>.</p>
      </Container>
      <TemplateFooter />
    </Responsive>
  )
}

export default NotFound