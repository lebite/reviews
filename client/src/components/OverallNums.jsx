import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/overallnums.css';

const OverallNums = ({ nums }) => {
  const {
    avgFoodRating,
    avgServiceRating,
    avgAmbienceRating,
    avgValueRating,
  } = nums;

  return (
    <div className={styles.overallrev}>
      <div className={styles.indiv}>
        <div className={styles.num}>{avgFoodRating}</div>
        <div className={styles.text}>Food</div>
      </div>
      <div className={styles.indivline}>
        <div className={styles.num}>{avgServiceRating}</div>
        <div className={styles.text}>Service</div>
      </div>
      <div className={styles.indivline}>
        <div className={styles.num}>{avgAmbienceRating}</div>
        <div className={styles.text}>Ambience</div>
      </div>
      <div className={styles.indivline}>
        <div className={styles.num}>{avgValueRating}</div>
        <div className={styles.text}>Value</div>
      </div>
    </div>
  );
};

OverallNums.propTypes = {
  nums: PropTypes.shape({
    avgFoodRating: PropTypes.number,
    avgServiceRating: PropTypes.number,
    avgAmbienceRating: PropTypes.number,
    avgValueRating: PropTypes.number,
  }).isRequired,
};

export default OverallNums;
