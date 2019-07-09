/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import StarRating from './StarRating.jsx';
import Noise from './Noise.jsx';
import Recommend from './Recommend.jsx';
import OverallNums from './OverallNums.jsx';
import Neighborhood from './Neighborhood.jsx';
import styles from './style/header.css';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const numReviews = this.props.reviews[0] || {};
    return (
      <div className={styles.feed}>
        <div className={styles.feedlist}>
          What {numReviews.restaurant_total_reviews} people are saying
        </div>
        <div className={styles.header_lower}>
          <div>
            Overall ratings and reviews
          </div>
          <div className={styles.header_normal}>
            Reviews can only be made by diners who have eaten at this restaurant
          </div>
          <div>
            <StarRating rating={this.props.reviews} />
          </div>
          <div>
            <OverallNums nums={numReviews} />
          </div>
          <div>
            <Noise noiseLevel={numReviews} />
          </div>
          <div>
            <Recommend recLevel={numReviews} />
          </div>
        </div>
        <div className={styles.neighborhood_wrapper}>
          <Neighborhood />
        </div>
      </div>
    );
  }
}

export default Header;
