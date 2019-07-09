/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import styles from './style/starrating.css';

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating_half_star: 3.5,
    };
    // still need to work on this to get it rendering correctly
  }

  render() {
    const { rating_half_star } = this.state;
    const { rating } = this.props;
    const avgRating = { rating }.rating[0] || {};

    return (
      <div className={styles.staroverall}>
        <StarRatingComponent
          name="overallrate"
          value={rating_half_star}
          starCount={5}
          starColor="red"
          emptyStarColor="#f6f6f6"
          // onStarClick={this.onStarClickHalfStar}
          // renderStarIcon={(index, value) => (
          //   <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
          // )}
          // renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
        />
        <span className={styles.startext}>{avgRating.avg_overall_rating}</span>
        <span>&nbsp;&nbsp;based on recent ratings</span>
      </div>
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.shape.isRequired,
};

export default StarRating;
