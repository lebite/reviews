/* eslint-disable camelcase */
import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import Avatar from 'react-avatar';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import styles from './style/indivReview.css';


const IndivReview = ({ review }) => {
  const {
    review_food_rating,
    review_service_rating,
    review_ambience_rating,
    review_value_rating,
    user_name,
    user_location,
    user_total_reviews,
    review_date,
    review_overall_rating,
    review_body,
  } = review;

  const colors = ['#df4e96', '#d86441', '#6c8ae4', '#bb6acd'];
  const index = Math.floor(Math.random() * Math.floor(colors.length));
  const rating = Math.ceil(({ review_food_rating }.review_food_rating
    + { review_service_rating }.review_service_rating
    + { review_ambience_rating }.review_ambience_rating
     + { review_value_rating }.review_value_rating) / 4);

  return (
    <div className={styles.reviewBody}>
      <div className={styles.sideBar}>
        <Avatar className={styles.avatar} name={user_name} color={colors[index]} size="48px" round="100px" />
        <span className={styles.userName}>{ user_name }</span>
        <span className={styles.userLocation}>{ user_location }</span>
        <span className={styles.userTotalReviews}>
          <FiMessageSquare />
          { user_total_reviews }
          &nbsp;
          {{ user_total_reviews } === 1 ? 'review' : 'reviews'}
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
            {new Date({ review_date }.review_date).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className={styles.ratings}>
          <span className={styles.ratingsText}> Overall </span>
          <span className={styles.ratingsNum}>
            { review_overall_rating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Food </span>
          <span className={styles.ratingsNum}>
            { review_food_rating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Service </span>
          <span className={styles.ratingsNum}>
            { review_service_rating }
          </span>
          <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Ambience </span>
          <span className={styles.ratingsNum}>
            { review_ambience_rating }
          </span>
        </div>
        <p>
          { review_body }
        </p>
      </div>
    </div>
  );
};

IndivReview.propTypes = {
  review: PropTypes.shape({
    review_food_rating: PropTypes.number,
    review_service_rating: PropTypes.number,
    review_ambience_rating: PropTypes.number,
    review_value_rating: PropTypes.number,
    user_name: PropTypes.string,
    user_location: PropTypes.string,
    user_total_reviews: PropTypes.number,
    review_date: PropTypes.string,
    review_overall_rating: PropTypes.number,
    review_body: PropTypes.string,
  }).isRequired,
};

export default IndivReview;
