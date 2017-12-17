import React, { Component } from 'react';
import './Sidebar.component.css';
/**
  * The Sidebar allows the user to filter and adjust search results using the Algolia api
  */

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
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
    );
  }
}

export default Sidebar;
