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

  convertMsToSeconds() {
    let seconds = 0.0001 * this.props.timeInMS;
    return seconds.toString().slice(0, 6);
  }

  render() {
    let numHits = this.props.numHits;
    let time = this.convertMsToSeconds();
    return (
      <div className="results">
        <h3>{numHits} results found</h3><p> in {time} seconds</p>
        {this.getListElements()}
        <button>Show More</button>
      </div>
    );
  }
}

export default Results;
