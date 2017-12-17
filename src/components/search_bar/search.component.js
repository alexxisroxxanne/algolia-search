import React, { Component } from 'react';
import Sidebar from '../sidebar_filters_and_ranks/sidebar.component';
import Results from '../results_list/results.component';
import './search.component.css';
/**
  * The Search component implements the Algolia search API to allow the user to find restaurants
  */

class Search extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="search-placement search-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search for Restaurants by Name, Cuisine, Location">
          </input>
        </div>
        <div className="sidebar-placement"><Sidebar /></div>
        <div className="results-placement"><Results /></div>
      </div>
    );
  }
}

export default Search;
