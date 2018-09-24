import React from 'react'
import { Grid, Modal, Button } from 'semantic-ui-react'

export default (props) => (
  <Modal closeIcon trigger={<Button color='teal' style={{margin: '20px'}}>{props.buttonText}</Button>}>
    <Modal.Header>{props.modalTitle}</Modal.Header>
    <Modal.Content scrolling>
      <Modal.Description>
        <Grid>
          {props.children}
        </Grid>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)