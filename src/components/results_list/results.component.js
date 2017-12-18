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
    return this.props.listResults.map( (restaurant) => {
      return (
        <div className="restaurant_result">
          <img src={restaurant["image_url"]} alt="restaurant picture"></img>
          <span>
            <a href={restaurant["reserve_url"]} target="_blank">{restaurant.name}</a>
          </span>
        </div>
      );
    });
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
        <div className="results_header">
          <span>{numHits} results found</span>
          <span className="results_time"> in {time} seconds</span>
        </div>
        <div className="results_border"></div>
        {this.getListElements()}
        <button
          onClick={this.props.onButtonClick}
          className="show_more_button"
        >
          Show More
        </button>
      </div>
    );
  }
}

export default Results;
