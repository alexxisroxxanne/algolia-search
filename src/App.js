import React, { Component } from 'react';
import Search from './components/search_bar/search.component';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Search />
      </div>
    );
  }
}

export default App;
