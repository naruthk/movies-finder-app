import React from 'react'
import {
  Container,
  Menu,
} from 'semantic-ui-react'

import config from '../../utils/config'

const { menu } = config

const TemplateMenu = () => (
  <Menu fixed='top'>
    <Container>
      {menu.map((item) => {
        return <Menu.Item as='a' href={item.path}>{item.name}</Menu.Item>
      })}
    </Container>
  </Menu>
)

export default TemplateMenu