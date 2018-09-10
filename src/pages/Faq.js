import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Accordion, Container, Header, Icon, Responsive, Segment } from 'semantic-ui-react'

import TemplateHeader from '../components/Header'
import TemplateFooter from '../components/Footer'

import { siteTitle, siteDescription } from '../utils'

class Faq extends Component {

  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  render() {
    const lastUpdatedDate = 'September 6, 2018'
    const { activeIndex } = this.state

    return (
      <Responsive>

        <Helmet>
          <meta charSet="utf-8" />
          <title>FAQ - {siteTitle}</title>
        </Helmet>

        <TemplateHeader>

          <Segment
            inverted
            textAlign='center'
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Container text>
              <Header
                as='h1'
                content='Movies Finder'
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  margin: '1.5em 0em'
                }}
              />
            </Container>
          </Segment>
        
        </TemplateHeader>

        <Container style={{ padding: '3em' }}>
        
          <Header
            as='h2'
            content='FAQ'
          />

          <p>Last updated: {lastUpdatedDate}</p>
        
          <Accordion fluid styled>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='dropdown' />
              What is {siteTitle}
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <p>
                {siteDescription}
              </p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Can I trust the information on this website?
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <p>{siteTitle} strives to bring the latest updates and information for your favorite movies and TV shows. But {siteTitle} utilizes sources from other parties like IMDB, Google News, and etc. This ultimately means that {siteTitle} is not responsible for any correct or incorrect information you may receive.</p>
              <p>For most accurate and reliable information, {siteTitle} suggests the user to visit the publishing company's website.</p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Donation / Support
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <p>Running this project requires a bit of money on my own. By supporting this project, {siteTitle} can continue to run without ads and subscription fees. Nobody likes that.</p>
              <p>Donation will be open soon.</p>
            </Accordion.Content>

            <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
              <Icon name='dropdown' />
              Collaboration
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <p>If you are interested in working with me to improve and add more features to {siteTitle}, please send me an <a href="mailto:nkongurai@gmail.com">email</a> explaining who you are, your background, and why you want to work with me.</p>
            </Accordion.Content>
          </Accordion>

        </Container>
        <TemplateFooter />
    
      </Responsive>
    );
  }
}

export default Faq;