import React from 'react';
import IndivReview from './IndivReview.jsx';

const Reviews = (props) => (
    <div>

      {props.reviews.length > 0 ? props.reviews.map((each, index) => {
        return <IndivReview key={index} review={each}/>
      })
      : <h1>ERROR</h1>
      }
    </div>
  )

export default Reviews;
