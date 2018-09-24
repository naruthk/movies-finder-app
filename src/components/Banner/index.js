import React from 'react'
import PropTypes from 'prop-types';
import { Segment, Container} from 'semantic-ui-react'

const Banner = (props) => (
  <Segment
    inverted={props.inverted}
    vertical
    textAlign={props.textAlign}
    style={props.css} >
    <Container>{props.text}</Container>
  </Segment>
)

export default Banner

Banner.propTypes = {
  inverted: PropTypes.bool,
  text: PropTypes.object.isRequired,
  css: PropTypes.object
}

Banner.defaultProps = {
  inverted: true,
  text: ''
}