import React from 'react'
import PropTypes from 'prop-types';
import { Segment, Container} from 'semantic-ui-react'

const Banner = props => (
  <Segment
    inverted
    vertical
    textAlign='center'
    style={props.css} >
    <Container>{props.text}</Container>
  </Segment>
)

export default Banner

Banner.propTypes = {
  css: PropTypes.object,
  text: PropTypes.string
}