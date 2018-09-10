import React from 'react'
import moment from 'moment'
import { Grid, List, Segment, Image, Icon } from 'semantic-ui-react'

import Config from '../../../utils/app.config'
import { shortenLargeNumber } from '../../../utils/helper'

export default class MovieOverviewSection extends React.Component {

  render() {
    const { tmdb_image_uri } = Config
    const result = this.props.content

    const filteringForDirectors = result.crew ? result.crew.filter(person => person.job === "Director") : ""
    const listOfDirectors = filteringForDirectors.map(director => director.name).join(", ")
    
    const resultsObj = {
      'Plot': `${result.overview}`,
      'Genres': `${(result.genres).join(', ').toString()}`,
      'Directed by': `${listOfDirectors}`,
      'Release Date': `${moment(result.release_date).format('MMMM Do YYYY')}`,
      'Runtime': `${result.runtime} minutes`,
      'Budget': `${shortenLargeNumber(result.budget)}`,
      'Revenue': `${shortenLargeNumber(result.revenue)}`
    }

    return (
      <Segment inverted>
        <Grid columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <Image rounded centered src={`${tmdb_image_uri}/${result.poster}`} size="medium" />
            </Grid.Column>
            <Grid.Column>
              <List divided inverted relaxed size='large'>
                {Object.keys(resultsObj).map(function(key, index) {
                    return (
                      <List.Item key={index + "-detail"}>
                        <List.Content>
                          <List.Header>{key}</List.Header>
                            {resultsObj[key]}
                        </List.Content>
                      </List.Item>
                    )}
                )}
                <List.Item>
                  <List.Content>
                    <List.Header>Votes</List.Header>
                      <Icon color='orange' name='star' /> <span><strong>{result.vote_average}</strong> / 10</span> ({result.vote_count} Votes)
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}