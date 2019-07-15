import React from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import styles from './style/noiseandrec.css';

const Recommend = ({ recLevel }) => {
  const { avgRecRating } = recLevel;

  return (
    <div className={styles.container}>
      <div className={styles.noiseoverall}>
        {avgRecRating > 50 ? <FiThumbsUp /> : <FiThumbsDown />}
        <span className={styles.noise}>
          &nbsp;
          {avgRecRating}
          % of people
          <span id={styles.normal}>&nbsp;would recommend it to a friend</span>
        </span>
      </div>
    </div>
  );
};

Recommend.propTypes = {
  recLevel: PropTypes.shape({
    avgRecRating: PropTypes.number,
  }).isRequired,
};


export default Recommend;
