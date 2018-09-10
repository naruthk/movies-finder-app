import React, { Component } from 'react'
import history from '../../../utils/history'
import { Search, Container, Item } from 'semantic-ui-react'

import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'

import ListOfMoviesUnit from '../../Movies/List/Unit'

import Config from '../../../utils/app.config'

export default class SearchWithAutoComplete extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ 
    isLoading: false, 
    results: [], 
    value: ''
  })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    history.push(`/list/${result.movieid}`);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    const { tmdb_api_key, tmdb_default_uri } = Config

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      
      const searchTerms = this.state.value.split(" ").join("+")

      // Get movie and tv shows based on query
      axios.get(`${tmdb_default_uri}/search/multi?api_key=${tmdb_api_key}&language=en-US&query=${searchTerms}`)
        .then(res => {
          this.setState({ results: [] })
          const resultsObj = res.data.results
          const results = resultsObj.map((result) => {
            return ( 
              { 
                movieid: `${result.id}`,
                title : `${result.title}`,
                type : `${String(result.media_type).charAt(0).toUpperCase() + String(result.media_type).substring(1)}`,
                description : `${result.overview}`,
                image: `${result.poster_path}`,
                date: `${result.release_date}`,
                vote_average : `${result.vote_average}`,
                vote_count: `${result.vote_count}`
              }
            )
          })
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.title)
          this.setState({
            isLoading: false,
            results: _.filter(results, isMatch),
          })
        }
      );
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    const resultsRenderer = ({ movieid, title, image, description, date, vote_average, vote_count }) => [
      <Item.Group key='content'>
        <ListOfMoviesUnit
          key={movieid + `-item`}
          id={movieid}
          imgSize='huge'
          imgUrl={image}
          title={title}
          description={description ? description.substring(0, 150) + "..." : ""}
          date={moment(date).format('MMMM Do YYYY')}
          vote_average={vote_average}
          vote_count={vote_count}
        />
      </Item.Group>
    ]
    return (
      <Container>
        <Search
          fluid
          // aligned='right'
          noResultsMessage='No results to display'
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          resultRenderer={resultsRenderer}
          value={value}
          {...this.props}
        />
      </Container>
    )
  }
}

{/* <Grid>
  <Grid.Column width={6}>
    <Search
      loading={isLoading}
      onResultSelect={this.handleResultSelect}
      onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
      results={results}
      value={value}
      {...this.props}
    />
  </Grid.Column>
  <Grid.Column width={10}>
    <Segment>
      <Header>State</Header>
      <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
      <Header>Options</Header>
      <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
    </Segment>
  </Grid.Column>
</Grid> */}