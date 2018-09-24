import React, { Component } from 'react'
import { Accordion, Container, Header, Icon } from 'semantic-ui-react'
import Layout from '../layouts/main'
import TopTitle from '../components/TopTitle/'

import config from '../utils/config'

export default class Faq extends Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const title = 'FAQ'
    const lastUpdatedDate = 'September 23rd, 2018'
    const { site } = config
    const { activeIndex } = this.state

    return (
      <Layout title={title}>
        <TopTitle title={title}></TopTitle> 

        <Container style={{ padding: '3em' }}>
          <Header as='h2' content='FAQ' />
          <p>Last updated: {lastUpdatedDate}</p>
          
          <Accordion fluid styled>
            {site.faq.map((item, index) => 
              <div>
                <Accordion.Title 
                  active={activeIndex === index} 
                  index={index}
                  onClick={this.handleClick}>
                  <Icon name='dropdown' /> {item.title}
                </Accordion.Title>
                <Accordion.Content 
                  active={activeIndex === index} >
                  <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                </Accordion.Content>
              </div>
            )}
          </Accordion>
        </Container>
      </Layout>
    );
  }
}