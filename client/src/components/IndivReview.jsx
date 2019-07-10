import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import Avatar from 'react-avatar';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import styles from './style/indivReview.css';


const IndivReview = ({ review }) => {
  const {
    reviewFoodRating,
    reviewServiceRating,
    reviewAmbienceRating,
    reviewValueRating,
    userName,
    userLocation,
    userTotalReviews,
    reviewDate,
    reviewOverallRating,
    reviewBody,
  } = review;

  const colors = ['#df4e96', '#d86441', '#6c8ae4', '#bb6acd'];
  const index = Math.floor(Math.random() * Math.floor(colors.length));
  const rating = Math.ceil(({ reviewFoodRating }.reviewFoodRating
    + { reviewServiceRating }.reviewServiceRating
    + { reviewAmbienceRating }.reviewAmbienceRating
     + { reviewValueRating }.reviewValueRating) / 4);

  return (
    <div className={styles.reviewBody}>
      <div className={styles.sideBar}>
        <Avatar className={styles.avatar} name={userName} color={colors[index]} size="48px" round="100px" />
        <span className={styles.userName}>{ userName }</span>
        <span className={styles.userLocation}>{ userLocation }</span>
        <span className={styles.userTotalReviews}>
          <FiMessageSquare />
          { userTotalReviews }
          &nbsp;
          {{ userTotalReviews } === 1 ? 'review' : 'reviews'}
        </span>
      </div>
      <div>
        <div className={styles.reviewRating}>
          <StarRatingComponent
            name="individualrating"
            value={rating}
            starCount={5}
            starColor="red"
            emptyStarColor="#f6f6f6"
          />
          &nbsp;&#183;&nbsp;
          <span className={styles.dineDate}>
            Dined on&nbsp;
            {new Date({ reviewDate }.reviewDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className={styles.ratings}>
          <span className={styles.ratingsText}> Overall </span>
          <span className={styles.ratingsNum}>
            { reviewOverallRating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Food </span>
          <span className={styles.ratingsNum}>
            { reviewFoodRating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Service </span>
          <span className={styles.ratingsNum}>
            { reviewServiceRating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Ambience </span>
          <span className={styles.ratingsNum}>
            { reviewAmbienceRating }
          </span>
        </div>
        <p>
          { reviewBody }
        </p>
      </div>
    </div>
  );
};

IndivReview.propTypes = {
  review: PropTypes.shape({
    reviewFoodRating: PropTypes.number,
    reviewServiceRating: PropTypes.number,
    reviewAmbienceRating: PropTypes.number,
    reviewValueRating: PropTypes.number,
    userName: PropTypes.string,
    userLocation: PropTypes.string,
    userTotalReviews: PropTypes.number,
    reviewDate: PropTypes.string,
    reviewOverallRating: PropTypes.number,
    reviewBody: PropTypes.string,
  }).isRequired,
};

export default IndivReview;
