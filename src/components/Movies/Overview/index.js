import React from 'react'
import { Header, Grid, List, Segment, Image, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import ModalVideo from '../../Modal/Video'
import helpers from '../../../utils/helpers'

const filterForDirectors = (data) => data ? data.filter(person => person.job === "Director") : ""

const MovieOverviewSection = (props) => {
  const { details, crew } = props
  const listOfDirectors = filterForDirectors(crew).map(director => director.name).join(", ")
  const IMAGE_PATH = `https://image.tmdb.org/t/p/w500/${details.poster_path}`
  const detailsObj = {
    'Plot': `${details.overview}`,
    'Genres': `${_.map(details.genres, 'name').join(', ').toString()}`,
    'Directed by': `${listOfDirectors}`,
    'Release Date': `${helpers.createReadableDate(details.release_date)}`,
    'Runtime': `${details.runtime} minutes`,
    'Budget': `${helpers.shortenLargeNumber(details.budget)}`,
    'Revenue': `${helpers.shortenLargeNumber(details.revenue)}`
  }

  return (
    <Grid.Column style={{ padding: '3em' }}>
      <Grid divided='vertically'>
        <Grid.Row columns={2}>
          <Grid.Column>
          <Header
            as='h2'
            content='Overview'
            subheader={`Get all the details about ${props.details.title}`} />
          </Grid.Column>
          <Grid.Column textAlign='right'>
            {props.videos.length !== 0 && (<ModalVideo modalTitle="Play Trailer" details={props.details} videos={props.videos} />)}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Segment inverted>
        <Grid columns='equal' stackable>
          <Grid.Row>
            <Grid.Column>
              <Image rounded centered src={IMAGE_PATH} size="medium" />
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
                      <Icon color='orange' name='star' /> <span><strong>{props.details.vote_average}</strong> / 10</span> ({props.details.vote_count} Votes)
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

    </Grid.Column>
  )
}

export default MovieOverviewSection