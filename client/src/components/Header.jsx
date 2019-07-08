import React from 'react';
import StarRating from './StarRating.jsx';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const numReviews = this.props.reviews[0] || {};
    return (
      <div className="feed">
        <div className="feed-list">
          What {numReviews.restaurant_total_reviews} people are saying
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
