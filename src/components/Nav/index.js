import React from 'react'
import {
  Container,
  Menu,
} from 'semantic-ui-react'

const TemplateMenu = () => (
  <Menu fixed='top'>
    <Container>
      <Menu.Item as='a' href="/">Home</Menu.Item>
      <Menu.Item as='a' href="/about">About</Menu.Item>
      <Menu.Item as='a' href="/faq">FAQ</Menu.Item>
      <Menu.Item as='a'>Report</Menu.Item>
    </Container>
  </Menu>
)

export default TemplateMenu