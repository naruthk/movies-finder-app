import React from 'react'
import {
  Segment
} from 'semantic-ui-react'

import Navigation from '../Navigation';

export default class TemplateHeader extends React.Component {
  render() {
    return (
      <Segment style={{ padding: '10px 0' }}>
        <Navigation />
        {this.props.children}
      </Segment>
    )
  }
}

// padding: '5em 0em', 
//style={{ margin: '0 0 1.5em 0' }}

        // {/* <Container fluid style={{margin: '0 0 1.5em 0'}}> */}
        //       {/* </Container> */}