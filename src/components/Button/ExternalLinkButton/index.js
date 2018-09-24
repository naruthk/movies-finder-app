import React from 'react'
import { Button } from 'semantic-ui-react'

export default (props) => (
  <a href={props.url}>
    <Button
      content=''
      icon={props.icon}
      label={{ as: 'button', basic: true, content: props.text }} 
      labelPosition='right'/>
  </a>
)