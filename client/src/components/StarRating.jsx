import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/starrating.css';

const StarRating = (props) => {
  const { rating } = props;
  const avgRating = { rating }.rating[0] || {};
  const text = parseFloat(avgRating.avgOverallRating).toFixed(1);

  const starRates = Math.round(avgRating.avgOverallRating * 2) / 2;

  const arr = [];
  const arrrem = [];
  let halfstar = false;
  const emptystars = 5 - Math.ceil(starRates);
  let totnumstars = starRates;

  if ((starRates - Math.floor(starRates)) !== 0) {
    halfstar = true;
    totnumstars = starRates - 0.5;
  }

  for (let i = 0; i < totnumstars; i += 1) {
    arr.push(0);
  }
  for (let j = 0; j < emptystars; j += 1) {
    arrrem.push(0);
  }

  return (
    <div className={styles.starOverall}>
      <div className={styles.starWrapper}>
        {arr.map(() => (
          <icon className={styles.icon}>
            <span className={styles.fullStyleRed} data-content="&#9733;">&#9733;</span>
          </icon>
        ))}

        { halfstar
          ? (
            <icon className={styles.icon}>
              <span className={styles.halfStyle} data-content="&#9733;">&#9733;</span>
            </icon>
          )
          : null
        }

        {arrrem.map(() => (
          <icon className={styles.icon}>
            <span className={styles.fullStyleGrey} data-content="&#9733;">&#9733;</span>
          </icon>
        ))}

      </div>
      <div className={styles.textWrapper}>
        <span className={styles.startext}>{text}</span>
        <span className={styles.startext}>&nbsp;&nbsp;based on recent ratings</span>
      </div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.arrayOf.isRequired,
};

export default StarRating;
