import React from 'react'
import { Responsive } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import Header from '../components/Header/'
import Footer from '../components/Footer/'

import config from '../utils/config'

export default (props) => {
  return (
    <Responsive>
      <Helmet>
        <title>{props.title ? ( `${props.title} - ${config.siteTitle}` ) : (config.siteTitle)}</title>
        <meta name="description" content={props.description ? ( `${props.description}` ) : ( `${config.siteDescription}` )} />
        <meta charSet="utf-8" />
      </Helmet>
      <Header />
      {/* Adding 70px is needed to push the children components down just enough so that they are visible. Otherwise the navigation bar at the top blocks the view.*/ }
      <div style={props.topMarginBeforeChildren ? ({ margin: `${props.topMarginBeforeChildren} 0 0 0`}) : ({ margin: '70px 0 0 0' })}>
        {props.children}
      </div>
      <Footer />
    </Responsive>
  )
}