import React from 'react';
import StarRating from './StarRating.jsx';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="feed">
        <div className="feed-list">
          What 1078 people are saying
        </div>
        <div>
          <div>
            Overall ratings and reviews
          </div>
          <div>
            Reviews can only be made by diners who have eaten at this restaurant
          </div>
          <StarRating />
        </div>
      </div>
    );
  }
}

export default Header;
