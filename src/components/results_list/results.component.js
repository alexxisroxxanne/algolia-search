import _ from 'lodash';
import React, { Component } from 'react';
import './Results.component.css';

/**
  * The Results component displays the list of matching restaurants to the user
  */

class Results extends Component {
  constructor(props) {
    super(props);
    this.getListElements = this.getListElements.bind(this);
    this.getRestaurantInfo = this.getRestaurantInfo.bind(this);
    this.convertInfoToObject = this.convertInfoToObject.bind(this);
    this.getStarsFromRating = this.props.getStarsFromRating.bind(this);
  }

  getListElements() {
    let getInfo = this.getRestaurantInfo;
    let convertInfoToObject = this.convertInfoToObject;
    let getInfoHtml = this.getHtmlFromObject;
    let context = this;
    return this.props.listResults.map( (restaurant) => {
      let moreInfo = getInfo(restaurant);
      let infoStructure = moreInfo ? convertInfoToObject(moreInfo) : null;
      let infoHtml = getInfoHtml(infoStructure, context);
      return (
        <div className="restaurant_result">
          <img className="restaurant_img" src={restaurant["image_url"]}></img>
          <div className="restaurant_info">
            <a className="restaurant_title"
               href={restaurant["reserve_url"]}
               target="_blank"
            >
              {restaurant.name}
            </a>
            {infoHtml}
          </div>
        </div>
      );
    });
  }

  getRestaurantInfo(restaurant) {
    return _.find(this.props.infoResults, (infoResult) => infoResult.query === restaurant.objectID );
  }

  convertInfoToObject(infoHit) {
    let hit = infoHit.hits[0];
    let info = _.find(hit, (value, prop) => prop !== 'objectID');
    const labels = [
      'objectID',
      'food_type',
      'stars_count',
      'reviews_count',
      'neighborhood',
      'phone_number',
      'price_range',
      'dining_style'
    ];
    let valsArray = info.split(';');
    return _.reduce(valsArray, (valMap, val, index) => {
      valMap[labels[index]] = val;
      return valMap;
    }, {});
  }

  getHtmlFromObject(info, context) {
    if (!info) { return (<span></span>); }
    let stars = context.getStarsFromRating(info['stars_count']);
    return (
      <div>
        <div className="restaurant_rating">
          <span className="stars_text restaurant_details">
            {info['stars_count']}
          </span>
           <span className="restaurant_details">{stars}</span>
          <span className="restaurant_details">
            ({info['reviews_count']} reviews)
          </span>
        </div>
        <div className="restaurant_details">
          {info['food_type']} | {info['neighborhood']} | {info['price_range']}
        </div>
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
