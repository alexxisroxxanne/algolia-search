import React, { Component } from 'react';
import './Results.component.css';

/**
  * The Results component displays the list of matching restaurants to the user
  */

class Results extends Component {
  constructor(props) {
    super(props);
    this.getListElements = this.getListElements.bind(this);
  }

  getListElements() {
    return this.props.listResults.map( (restaurant) =>
      <div>
        {restaurant.name}
      </div>
    );
  }

  render() {
    return (
      <div className="results">
        <h3>results found</h3>
        {this.getListElements()}
        <button>Show More</button>
      </div>
    );
  }
}

export default Results;
