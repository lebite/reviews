/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
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
    const { reviews } = this.props;
    const numReviews = { reviews }.reviews[0] || {};

    return (
      <div className={styles.feed}>
        <div className={styles.feedlist}>
          What&nbsp;
          {numReviews.restaurant_total_reviews}
          &nbsp;People are saying
        </div>
        <div className={styles.header_lower}>
          <div>
            Overall ratings and reviews
          </div>
          <div className={styles.header_normal}>
            Reviews can only be made by diners who have eaten at this restaurant
          </div>
          <div>
            <StarRating rating={reviews} />
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

Header.propTypes = {
  reviews: PropTypes.arrayOf.isRequired,
};

export default Header;
