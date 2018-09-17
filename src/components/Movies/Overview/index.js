import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Grid, List, Segment, Image, Icon } from 'semantic-ui-react'

import authentication from '../../../utils/authentication'
import helpers from '../../../utils/helpers'

export default class MovieOverviewSection extends React.Component {

  render() {
    const { tmdb_image_uri } = authentication
    const { details, crew } = this.props

    const filterForDirectors = crew ? crew.filter(person => person.job === "Director") : ""
    const listOfDirectors = filterForDirectors.map(director => director.name).join(", ")
    
    const detailsObj = {
      'Plot': `${details.overview}`,
      'Genres': `${_.map(details.genres, 'name').join(', ').toString()}`,
      'Directed by': `${listOfDirectors}`,
      'Release Date': `${helpers.createReadableDate(details.release_date)}`,
      'Runtime': `${details.runtime} minutes`,
      'Budget': `${helpers.shortenLargeNumber(details.budget)}`,
      'Revenue': `${helpers.shortenLargeNumber(details.revenue)}`
    }

    const imagePath = `${tmdb_image_uri}/${details.poster_path}`

    return (
      <Segment inverted>
        <Grid columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <Image rounded centered src={imagePath} size="medium" />
            </Grid.Column>
            <Grid.Column>
              <List divided inverted relaxed size='large'>
                {Object.keys(detailsObj).map(function(key, index) {
                    return (
                      <List.Item key={index + "-detail"}>
                        <List.Content>
                          <List.Header>{key}</List.Header>
                            {detailsObj[key]}
                        </List.Content>
                      </List.Item>
                    )}
                )}
                <List.Item>
                  <List.Content>
                    <List.Header>Votes</List.Header>
                      <Icon color='orange' name='star' /> <span><strong>{details.vote_average}</strong> / 10</span> ({details.vote_count} Votes)
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

MovieOverviewSection.propTypes = {
  details: PropTypes.object.isRequired,
  crew: PropTypes.array.isRequired
}