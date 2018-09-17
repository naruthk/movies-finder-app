import React from 'react'
import { Button } from 'semantic-ui-react'

const ExternalLinkButton = props => (
  <a href={props.url}><Button content='' icon={props.icon} label={{ as: 'button', basic: true, content: props.text }} labelPosition='right'/></a>
)

export default ExternalLinkButton