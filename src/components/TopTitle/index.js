import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

export default (props) => {
  return (
    <Segment inverted basic>
      <Container>
        <Header 
          as='h1'
          content={props.title}
          inverted
          style={{ fontSize: '4em', fontWeight: 'normal', margin: '0.5em 0em' }} />
      </Container>
    </Segment>
  )
}