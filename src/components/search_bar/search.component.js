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
      searchValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.listenForResults();
  }

  handleChange(event) {
    let listHelper = this.props.listHelper;
    let infoHeper = this.props.infoHeper;
    this.setState({ searchValue: event.target.value }, function() {
      listHelper.setQuery(this.state.searchValue).search();
    });
  }

  listenForResults() {
    let context = this;
    this.props.listHelper.on('result', (restaurantList) => {
      console.log('restaurantList', restaurantList)
      context.setState({ listResults: restaurantList.hits }, function() {
        console.log('list results ', this.state.listResults)
      });
    });
    this.props.infoHelper.on('result', (restaurantInfo) => {
      context.setState({ infoResults: restaurantInfo }, function() {
        console.log('restaurantInfo ', restaurantInfo)
      });
    });
  }

  render() {
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
        <div className="sidebar-placement"><Sidebar /></div>
        <div className="results-placement">
          <Results
            listResults={this.state.listResults}
            infoResults={this.state.infoResults}
          />
        </div>
      </div>
    );
  }
}

export default Search;
