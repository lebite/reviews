import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import Noise from './Noise.jsx';
import Recommend from './Recommend.jsx';
import OverallNums from './OverallNums.jsx';
import ReviewsChart from './ReviewsChart.jsx';
import styles from './style/summary.css';


class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { reviews, handleRatingButton } = this.props;
    const numReviews = reviews[0] || {};

    return (
      <div>
        <div className={styles.container}>
          <div className={styles.whatpplsay}>
            What&nbsp;
            {numReviews.restaurantTotalReviews}
            &nbsp;
            {numReviews.restaurantTotalReviews > 1 ? 'People are saying' : 'Person is saying'}
          </div>
          <div className={styles.header_lower}>
            <div>
              <div className={styles.text}>
                Overall ratings and reviews
              </div>
              <div className={styles.header_normal}>
                Reviews can only be made by diners who have eaten at this restaurant
              </div>
              <StarRating rating={reviews} />
              <OverallNums nums={numReviews} />
              <Noise noiseLevel={numReviews} />
              <Recommend recLevel={numReviews} />
            </div>
            <div className={styles.graph}>
              <ReviewsChart reviews={reviews} handleRatingButton={handleRatingButton} />
            </div>
          </div>
          <div className={styles.neighborhood_wrapper}>
            <a href="#" className={styles.header_neighborhood}>
              Best Restaurants in
              {' '}
              {numReviews.neighborhood}
              &nbsp;›
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Summary.propTypes = {
  reviews: PropTypes.any,
  handleRatingButton: PropTypes.any,
};

export default Summary;
