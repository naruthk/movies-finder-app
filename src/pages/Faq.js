import React, { Component } from 'react'
import { Accordion, Container, Header, Icon, Responsive } from 'semantic-ui-react'

// Components
import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

// Utilities
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
    const { siteFAQ, siteFAQLastModified } = config
    const { activeIndex } = this.state

    return (
      <Responsive>
        <TemplateHeader
          pageTitle='FAQ'
          wrapperCSS={{ padding: '1em 0em' }}
        >
          <Header as='h1' content='FAQ'
            inverted style={{ fontSize: '4em', fontWeight: 'normal', margin: '1.5em 0em' }}
          />
        </TemplateHeader>

        <Container style={{ padding: '3em' }}>
          <Header
            as='h2'
            content='FAQ'
          />
          <p>Last updated: {siteFAQLastModified}</p>
          
          <Accordion fluid styled>
            {siteFAQ.map((item, index) => {
              return (
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
              )
            })}
          </Accordion>
        </Container>

        <TemplateFooter />
    
      </Responsive>
    );
  }
}