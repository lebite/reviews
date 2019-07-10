import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import styles from './style/starrating.css';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingHalfStar: 3.5,
    };
    // still need to work on this to get it rendering correctly
  }

  render() {
    const { ratingHalfStar } = this.state;
    const { rating } = this.props;
    const avgRating = { rating }.rating[0] || {};

    return (
      <div className={styles.staroverall}>
        <StarRatingComponent
          name="overallrate"
          value={ratingHalfStar}
          starCount={5}
          starColor="red"
          emptyStarColor="#f6f6f6"
        />
        <span className={styles.startext}>{avgRating.avgOverallRating}</span>
        <span>&nbsp;&nbsp;based on recent ratings</span>
      </div>
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.shape.isRequired,
};

export default StarRating;
