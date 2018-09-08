import React from 'react'
import { Container, Grid, List, Divider, Button } from 'semantic-ui-react'

export default class MovieCrewSection extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }
  
  handleClick = (e) => {
    const { toggle } = this.state
    this.setState({ toggle: !toggle })
  }

  render() {
    const result = this.props.crew

    return (
      <Container fluid>
        <Grid columns='equal' divided>
          {result.slice(0, 4).map((person, index) => {
            return (
              <Grid.Column key={index + "-item"}>
                <List key={index + "-item"}>
                  <List.Item>
                    <List.Content style={{margin: '10px 0 0 0'}}>
                      <List.Header>{person.name}</List.Header>
                      <List.Description>
                        {person.job}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            )
          })}
        </Grid>
        <Divider hidden />
        {(!this.state.toggle) && <Button attached='bottom' onClick={this.handleClick}>View all</Button> }
        {(this.state.toggle) &&
          <Grid divided>
            <Grid.Column width={8}>
              {result.slice(4, result.length / 2).map((person, index) => {
                return (
                  <List key={index + "-item"}>
                    <List.Item>
                      <List.Content style={{margin: '10px 0 0 0'}}>
                        <List.Header>{person.name}</List.Header>
                        <List.Description>
                          {person.job}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                )
              })}
            </Grid.Column>
            <Grid.Column width={8}>
              {result.slice(result.length / 2).map((person, index) => {
                return (
                  <List key={index + "-item"}>
                    <List.Item>
                      <List.Content style={{margin: '10px 0 0 0'}}>
                        <List.Header>{person.name}</List.Header>
                        <List.Description>
                          {person.job}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                )
              })}
            </Grid.Column>
          </Grid>
        }
      </Container>
    )
  }
}