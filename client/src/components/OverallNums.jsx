import React from 'react';
import styles from './style/overallnums.css';

const OverallNums = (props) => {
  return (
    <div className={styles.overallrev}>
      <div className={styles.indiv}>
        <div className={styles.num}>{props.nums.avg_food_rating}</div>
        <div className={styles.text}>Food</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{props.nums.avg_service_rating}</div>
        <div className={styles.text}>Service</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{props.nums.avg_ambience_rating}</div>
        <div className={styles.text}>Ambience</div>
      </div>
      <div className={styles.indiv}>
        <div className={styles.num}>{props.nums.avg_value_rating}</div>
        <div className={styles.text}>Value</div>
      </div>
    </div>
  );
};

export default OverallNums;