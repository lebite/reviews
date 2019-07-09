/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/overallnums.css';

const OverallNums = ({ nums }) => {
  const {
    avg_food_rating,
    avg_service_rating,
    avg_ambience_rating,
    avg_value_rating,
  } = nums;

  return (
    <div className={styles.overallrev}>
      <div className={styles.indiv}>
        <div className={styles.num}>{avg_food_rating}</div>
        <div className={styles.text}>Food</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{avg_service_rating}</div>
        <div className={styles.text}>Service</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{avg_ambience_rating}</div>
        <div className={styles.text}>Ambience</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{avg_value_rating}</div>
        <div className={styles.text}>Value</div>
      </div>
    </div>
  );
};

OverallNums.propTypes = {
  nums: PropTypes.shape({
    avg_food_rating: PropTypes.number,
    avg_service_rating: PropTypes.number,
    avg_ambience_rating: PropTypes.number,
    avg_value_rating: PropTypes.number,
  }).isRequired,
};

export default OverallNums;
