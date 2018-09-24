import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import SearchInput from '../Search/AutocompleteSearch'
import config from '../../utils/config'

const { site } = config

export default () => (
  <Menu fixed='top'>
    <Container>
      {site.navigation.map((item) => {
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