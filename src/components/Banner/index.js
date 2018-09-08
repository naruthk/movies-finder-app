import React from 'react'
import { Segment, Container} from 'semantic-ui-react'

export default class Banner extends React.Component {
  render() {
    return (
      <Segment inverted vertical textAlign='center'
      style={{ padding: '1em 0em', margin: '2em 0' }} >
        <Container>
          {this.props.text}
        </Container>
      </Segment>
    )
  }
}