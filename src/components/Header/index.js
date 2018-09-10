import React from 'react'
import {
  Container
} from 'semantic-ui-react'

import Nav from '../Nav';

export default class TemplateHeader extends React.Component {
  render() {
    return (
      <Container fluid style={{ margin: '0 0 1.5em 0' }}>
        <Nav />
        {this.props.children}
      </Container>
    )
  }
}