import _ from 'lodash';
import React, { Component } from 'react';
import Results from '../results_list/Results.component';
import emptyStar from '../../resources/graphics/star-empty.png'
import fullStar from '../../resources/graphics/stars-plain.png'
import './Search.component.css';


/**
  * The Search component implements the Algolia search API to allow the user to find restaurants
  * TODO: handle filter and search combination
  * TODO: refactor for DRYness
  * TODO: implement better data structure for infoResults
  * TODO: add mobile classes for better mobile design
  */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listResults: [],
      infoResults: [],
      numberOfHits: 0,
      proccesingTime: 0,
      searchValue: '',
      searchError: '',
      filters: {
        'food_type': {
          label: 'Food Type / Cuisine',
          queries: []
        },
        'stars_count': {
          label: 'Rating',
          queries: []
        },
        'payment_options': {
          label: 'Payment Options',
          queries: []
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.getMoreResults = this.getMoreResults.bind(this);
    this.listenForResults();
    this.listenForErrors();
    this.getFilterOptions();
  }

  handleChange(event) {
    let listHelper = this.props.listHelper;
    let infoHeper = this.props.infoHeper;
    this.setState({ searchValue: event.target.value }, function() {
      listHelper
        .setQuery(this.state.searchValue)
        .setQueryParameter('aroundLatLngViaIP', true)
        .search();
    });
  }

  listenForResults(shouldNotUpdateState) {
    let context = this;
    this.props.listHelper.on('result', (restaurantList) => {
      let list = restaurantList.hits.length > 1 ?
                 restaurantList.hits :
                 [...context.state.listResults, restaurantList.hits];
      context.setState({
        listResults: list,
        numberOfHits: restaurantList.nbHits,
        proccesingTime: restaurantList.processingTimeMS
      }, () => {
        context.state.listResults.forEach( (hit) => {
          context.props.infoHelper
            .setQuery(hit.objectID)
            .setQueryParameter('aroundLatLngViaIP', false)
            .search();
        });
      });
    });
    this.props.infoHelper.on('result', (restaurantInfo) => {
      let fullList = [...context.state.infoResults, restaurantInfo];
      context.setState({ infoResults: fullList });
    });
  }

  listenForErrors() {
    let context = this;
    this.props.listHelper.on('error', (error) => {
      context.setState({ searchError:
        'There was a problem retrieving your search results.\n' + error
      });
    });
    this.props.infoHelper.on('error', (error) => {
      context.setState({ searchError:
        'There was a problem retrieving information about a restaurant.\n' + error
      });
    });
  }

  getFilterOptions() {
    let context = this;
    const options = {
      "food_type": ['Italian', 'American', 'Californian', 'French', 'Seafood', 'Japanese', 'Indian'],
      "stars_count": [0, 1, 2, 3, 4, 5],
      "payment_options": ['AMEX', 'Discover', 'MasterCard', 'Visa']
    };
    return _.reduce(options, (filters, filterOptions, filterName) => {
      _.forEach(filterOptions, (option) => {
        let needsListHelper = filterName === 'payment_options';
        let helper = needsListHelper ? context.props.listHelper : context.props.infoHelper;
        helper
          .setQuery(option)
          .setQueryParameter('aroundLatLngViaIP', needsListHelper)
          .searchOnce({}, (error, content) => {
            let filterState = context.state.filters;
            filterState[filterName].helper = helper;
            filterState[filterName].isList = needsListHelper;
            filterState[filterName].queries.push({ query: option, hits: content.nbHits});
            context.setState({filters: filterState});
          });
      });
    }, {});
  }

  renderFilters() {
    let applyfilter = this.applyfilter;
    let replaceRatingsWithStars = this.replaceRatingsWithStars;
    return _.map(this.state.filters, (filter) => {
      let filterOptions = filter.queries.map( (option) => {
        let mainButtonContent = (
          <button
            onClick={ () => this.applyFilter(filter.helper, option.query, filter.isList) }
          >
            <div className="option_title">{option.query}</div>
          </button>
        );
        let stars = replaceRatingsWithStars(option.query);
        return filter.label === 'Rating' ? (
          <div className="filter_option stars">
            <button
              onClick={() => this.applyFilter(filter.helper, option.query, filter.isList) }
              className="stars_button"
            >
              {stars}
            </button>
          </div>
        ) : (
          <div className="filter_option">
            {mainButtonContent}
            <div className="hits">{option.hits}</div>
          </div>
        );
      });
      return (
        <div className="filter_list">
          <h3 className="filter_header">{filter.label}</h3>
          {filterOptions}
        </div>
      );
    });
  }

  applyFilter(helper, query, isList) {
    if (isList) {
      helper
        .setQuery(query)
        .setQueryParameter('aroundLatLngViaIP', isList)
        .search();
    } else {
      let context = this;
      helper
        .setQuery(query)
        .searchOnce({ hitsPerPage: 3}, (error, restaurantInfoItems) => {
          restaurantInfoItems.hits.forEach( (hit) => {
            _.each(hit, (val, prop) => {
              if (prop !== 'objectID') {
                let actualId = typeof val === 'string' ? val.slice(0, val.indexOf(';')) : undefined;
                if (actualId) {
                  context.props.listHelper
                    .setQuery(actualId)
                    .setQueryParameter('aroundLatLngViaIP', isList)
                    .search({hitsPerPage: 1});
                }
              }
            })
          });
        })
    }
  }

  replaceRatingsWithStars(minStars) {
    let stars = [0, 1, 2, 3, 4];
    return stars.map( (star, index) => {
      return index <= minStars ?
            (<img className="star" src={fullStar} alt="star count"></img>) :
            (<img className="star" src={emptyStar} alt="star count"></img>);
    });
  }

  getMoreResults() {
    this.props.listHelper
      .setQuery(this.state.searchValue)
      .search({hitsPerPage: 6})
  }

  render() {
    let filters = this.renderFilters();
    let getStars = this.replaceRatingsWithStars;
    return (
      <div className="container">
        <div className="search-placement search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search for Restaurants by Name, Cuisine, Location"
            value={this.state.searchValue}
            onChange={this.handleChange}>
          </input>
        </div>
        <div className="sidebar-placement">
          {filters}
        </div>
        <div className="results-placement">
          <Results
            listResults={this.state.listResults}
            infoResults={this.state.infoResults}
            timeInMS={this.state.proccesingTime}
            numHits={this.state.numberOfHits}
            onButtonClick={this.getMoreResults}
            getStarsFromRating={getStars}
          />
        </div>
        {this.state.searchError}
      </div>
    );
  }
}

export default Search;
