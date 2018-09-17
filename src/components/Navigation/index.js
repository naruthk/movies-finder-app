import React from 'react'
import { Container, Menu } from 'semantic-ui-react'

// Components
import SearchInput from '../Search/AutocompleteSearch'

// Utilities
import config from '../../utils/config'

const { menu } = config

const TemplateMenu = () => (
  <Menu fixed='top'>
    <Container>
      {menu.map((item) => {
        return <Menu.Item key={item.name} as='a' href={item.path}>{item.name}</Menu.Item>
      })}
      <Menu.Menu position='right'>
        <div className='ui right aligned category search item'>
          <SearchInput />
        </div>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default TemplateMenu