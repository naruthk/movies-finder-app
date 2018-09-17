import React from 'react'
import { Helmet } from 'react-helmet'
import { Container, Segment } from 'semantic-ui-react'

// Components
import Navigation from '../Navigation';

// Utilities
import config from '../../utils/config'

const Header = props => (
  <Container fluid style={{ margin: '0 0 1.5em 0' }}>
    <Navigation />
    <Helmet>
      {props.pageTitle ? (
        <title>{props.pageTitle} - {config.siteTitle}</title>
      ) : (
        <title>404 - Not Found</title>
      )}
      <meta name="description" content={config.siteDescription} />
      <meta charSet="utf-8" />
    </Helmet>
    <Segment inverted style={props.wrapperCSS}>
      <Container style={props.childCSS}>
        {props.children}
      </Container>
    </Segment>
  </Container>
)

export default Header