import React from 'react'
import moment from 'moment'
import Config from '../../../utils/app.config'
import { shortenLargeNumber } from '../../../utils/helper'

import {
  Grid,
  Header,
  List,
  Segment,
  Image,
  Item,
  Icon
} from 'semantic-ui-react'

import ExternalLinkButton from '../../Buttons/ExternalLinkButton'

export default class OverallDetailsSection extends React.Component {

  render() {

    const { tmdb_image_uri } = Config

    const result = this.props.content

    const resultsObj = {
      'Plot': `${result.overview}`,
      'Genres': `${(result.genres).join(', ').toString()}`,
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