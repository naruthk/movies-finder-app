import React, { Component } from 'react'
import history from '../../../utils/history'
import { Search, Header } from 'semantic-ui-react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Utilities
import authentication from '../../../utils/authentication'
import helpers from '../../../utils/helpers'

export default class SearchWithAutoComplete extends Component {

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ 
    isLoading: false, 
    movies: [], 
    value: ''
  })

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title })
    history.push(`/list/${result.movie_id}`);
  }

  handleSearchChange = (e, { value }) => {
    const { tmdb_api_key, tmdb_default_uri } = authentication
    
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const searchTerms = this.state.value.split(" ").join("+")
      const ALL_MOVIES_ENDPOINT = `${tmdb_default_uri}/search/multi?api_key=${tmdb_api_key}&language=en-US&query=${searchTerms}`

      this.fetchMoviesBasedOnSearchTerms(ALL_MOVIES_ENDPOINT)
    }, 300)
  }

  fetchMoviesBasedOnSearchTerms(endpoint) {
    axios.get(endpoint)
      .then(res => {
        this.setState({ results: [] })
        const resultsObj = res.data.results
        const results = resultsObj.map((result) => {
          return ( 
            { 
              movie_id: `${result.id}`,
              original_title : `${result.title}`,
              type : `${String(result.media_type).charAt(0).toUpperCase() + String(result.media_type).substring(1)}`,
              poster_path: `${result.poster_path}`,
              release_date: `${result.release_date}`,
              vote_average : `${result.vote_average}`,
              vote_count: `${result.vote_count}`
            }
          )
        })
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.original_title)
        this.setState({
          isLoading: false,
          movies: _.filter(results, isMatch),
        })
      }
    );
  }

  render() {
    const { isLoading, value, movies } = this.state
    const resultsRenderer = (movie) => [
      <Link to={`list/${movie.movie_id}`}>
        <Header as='h3'>
          {movie.original_title}
          <Header.Subheader>
            {helpers.createReadableDate(movie.release_date)}
          </Header.Subheader>
        </Header>
      </Link>
    ]
    return (
      <Search
        noResultsMessage='No results to display'
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={movies}
        resultRenderer={resultsRenderer}
        value={value}
        {...this.props}
      />
    )
  }
}