import React from 'react';

const IndivReview = props => (
  <div className="reviewBody">
    <span>Dined on {props.review.review_date.slice(0,10)}</span>
    <span className="ratings">
      <span> Overall </span> <span className="ratingNum"> {props.review.review_overall_rating} &#183; </span>
      <span> Food </span> <span className="ratingNum"> {props.review.review_food_rating} &#183; </span>
      <span>Service </span> <span className="ratingNum"> {props.review.review_service_rating} &#183; </span>
      <span>Ambience </span> <span className="ratingNum"> {props.review.review_ambience_rating} </span>
    </span>
    <p>{props.review.review_body} </p>
  </div>
);

export default IndivReview;
