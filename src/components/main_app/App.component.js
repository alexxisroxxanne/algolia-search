import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import React, { Component } from 'react';
import Search from '../search_bar/Search.component';
import config from '../../config';
import './App.component.css';


const appId = config['APP_ID'],
      apiKey = config['API_KEY'],
      restListIndex = config['LIST_INDEX'],
      restInfoIndex = config['INFO_INDEX'];


class App extends Component {
  constructor() {
    super();
    this.initAlgoliaClient();
  }

  initAlgoliaClient() {
    const client = algoliasearch(appId, apiKey);
    this.restaurantListHelper = algoliasearchHelper(
      client, restListIndex, {
        hitsPerPage: 3
      }
    );
    this.restaurantInfoHelper = algoliasearchHelper(
      client, restInfoIndex, {
        hitsPerPage: 1
      }
    );
  }

  render() {
    return (
      <div className="app">
        <Search
          listHelper={this.restaurantListHelper}
          infoHelper={this.restaurantInfoHelper}
        />
      </div>
    );
  }
}

export default App;
