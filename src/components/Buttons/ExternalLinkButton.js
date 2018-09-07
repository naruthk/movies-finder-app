import React from 'react'
import {
  Button,
} from 'semantic-ui-react'

class ExternalLinkButton extends React.Component {
  render() {

    const { icon, url, text } = this.props

    return (
      <a href={url}>
        <Button content='' icon={icon} label={{ as: 'button', basic: true, content: text }} labelPosition='right'/>
      </a>
    )
  }
}

export default ExternalLinkButton