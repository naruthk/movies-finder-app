import React from 'react'
import { Button } from 'semantic-ui-react'

export default class ExternalLinkButton extends React.Component {
  render() {
    const { icon, url, text } = this.props

    return (
      <a href={url}>
        <Button content='' icon={icon} label={{ as: 'button', basic: true, content: text }} labelPosition='right'/>
      </a>
    )
  }
}