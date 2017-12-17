import React, { Component } from 'react';
import Search from './components/search_bar/search.component';
import Sidebar from './components/sidebar_filters_and_ranks/sidebar.component';
import Results from './components/results_list/results.component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="search-placement"><Search /></div>
        <div className="sidebar-placement"><Sidebar /></div>
        <div className="results-placement"><Results /></div>
      </div>
    );
  }
}

export default App;
