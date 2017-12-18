import _ from 'lodash';
import React, { Component } from 'react';
import Sidebar from '../sidebar_filters_and_ranks/Sidebar.component';
import Results from '../results_list/Results.component';
import './Search.component.css';


/**
  * The Search component implements the Algolia search API to allow the user to find restaurants
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
      searchError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.listenForResults();
    this.listenForErrors();
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
    // avoid updating the state when grabbing the filter lists
      let context = this;
      this.props.listHelper.on('result', (restaurantList) => {
        // if (!shouldNotUpdateState) {
        // }
        console.log('restaurantList', restaurantList)
        context.setState({
          listResults: restaurantList.hits,
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
        // if (!shouldNotUpdateState) {
        // }
        let fullList = [...context.state.infoResults, restaurantInfo];
        context.setState({ infoResults: fullList }, () => {
          console.log('restaurantInfo ', restaurantInfo)
        });
      });
    // }
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
      _.reduce(filterOptions, (html, option) => {
        let needsListHelper = filterName === 'payment_options';
        let helper = needsListHelper ? context.props.listHelper : context.props.infoHelper;
        helper
          .setQuery(option)
          .setQueryParameter('aroundLatLngViaIP', needsListHelper)
          .searchOnce({}, (error, content, state) => {
            console.log('this one got claled', content)
          })
      }, '');
    }, {});
  }

  render() {
    this.getFilterOptions()
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
        <div className="sidebar-placement sidebar">
          <div>
            <h3>Cuisine/Food Type</h3>
          </div>
          <div>
            <h3>Rating</h3>
          </div>
          <div>
            <h3>Payment Options</h3>
          </div>
        </div>
        <div className="results-placement">
          <Results
            listResults={this.state.listResults}
            infoResults={this.state.infoResults}
            timeInMS={this.state.proccesingTime}
            numHits={this.state.numberOfHits}
          />
        </div>
        {this.state.searchError}
      </div>
    );
  }
}

export default Search;
