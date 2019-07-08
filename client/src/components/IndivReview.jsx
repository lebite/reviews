import React from 'react';

const IndivReview = props => (
  <div className="reviewBody">
    {/* <span>Dined on {new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month:'long',
      day: '2-digit'
    }).format(props.review.review_date)} </span> */}

    <span>Dined on {new Date(props.review.review_date).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
    <div className="ratings">
      <span> Overall </span> <span className="ratingNum"> {props.review.review_overall_rating} &#183; </span>
      <span> Food </span> <span className="ratingNum"> {props.review.review_food_rating} &#183; </span>
      <span>Service </span> <span className="ratingNum"> {props.review.review_service_rating} &#183; </span>
      <span>Ambience </span> <span className="ratingNum"> {props.review.review_ambience_rating} </span>
    </div>
    <p>{props.review.review_body} </p>
  </div>
);

export default IndivReview;
