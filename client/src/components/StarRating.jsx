import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import { IoIosStarHalf, IoIosStarOutline, IoIosStar } from 'react-icons/io'
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
      <div className={styles.starOverall}>
        <div className={styles.starWrapper}>
          {/* <StarRatingComponent
            name="overallrate"
            value={ratingHalfStar}
            starCount={5}
            starColor="red"
            emptyStarColor="#f6f6f6"
          /> */}
          <icon className={styles.icon}>
            <IoIosStar className={styles.star} />
          </icon>
          <icon className={styles.icon}>
            <IoIosStar className={styles.star} />
          </icon>
          <icon className={styles.icon}>
            <IoIosStar className={styles.star} />
          </icon>
          <icon className={styles.icon}>
            <IoIosStar className={styles.star} />
          </icon>
          <icon className={styles.icon}>
            <IoIosStar className={styles.star} />
          </icon>
        </div>
        <div className={styles.textWrapper}>
          <span className={styles.startext}>{avgRating.avgOverallRating}</span>
          <span className={styles.startext}>&nbsp;&nbsp;based on recent ratings</span>
        </div>
      </div>
    );
  }
}

StarRating.propTypes = {
  rating: PropTypes.arrayOf.isRequired,
};

export default StarRating;
