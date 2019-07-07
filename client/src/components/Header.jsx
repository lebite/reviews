import React from 'react';
import StarRating from './StarRating.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const totalReviewsLength = this.props.reviews.length;
    console.log(totalReviewsLength);

    const totalReviewsScoreArr = [];
    for (const i = 0; i < totalReviewsLength; i++) {
      totalReviewsScoreArr.push(this.props.reviews[i].review_overall_rating)
    }
    console.log(totalReviewsScoreArr)
    const totalReviewsScore = totalReviewsScoreArr.reduce((accum, currVal) => accum + currVal);
    console.log(totalReviewsScore);

    return (
      <div className="feed">
        <div className="feed-list">
          What {totalReviewsLength} people are saying
        </div>
        <div>
          <div>
            Overall ratings and reviews
          </div>
          <div>
            Reviews can only be made by diners who have eaten at this restaurant
          </div>
          <StarRating />
          <div>
            based on recent ratings
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
