import React from 'react'
import { Modal, Button, Embed } from 'semantic-ui-react'

export default (props) => (
  <Modal trigger={<Button primary>{props.modalTitle}</Button>} closeIcon basic>
    <Modal.Header><h2>{props.details.title}</h2></Modal.Header>
    <Modal.Content>
      <Embed id={props.videos[0].key} placeholder={`https://img.youtube.com/vi/${props.videos[0].key}/0.jpg`} source='youtube' />
    </Modal.Content>
  </Modal>
)