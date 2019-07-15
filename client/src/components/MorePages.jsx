import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/morepages.css';

class MorePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
    };
  }

  render() {
    const {
      reviews,
      maxNumReviews,
      shiftUpReviews,
      shiftDownReviews,
    } = this.props;


    let totReviews = '';
    if (reviews.length > 0) {
      const { restaurantTotalReviews } = reviews[0];
      totReviews = restaurantTotalReviews;
    }

    const numButtons = Math.ceil(totReviews / maxNumReviews);
    const arr = [];
    for (let i = 1; i <= numButtons; i += 1) {
      arr.push(i);
    }

    return (

      <div className={styles.container}>
        <div className={styles.buttonContainer} onClick={shiftDownReviews}>
          <div className={styles.button}>
            <span className={styles.text}>&lt;</span>
          </div>
        </div>
        {arr.length <= 3
        ? <div className={styles.buttonContainer}>
          {arr.map((each, index) => (
            <div key={index} className={styles.button}>
              <span className={styles.text}>{each}</span>
            </div>
          ))}
        </div>
        : null }

        <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={() => shiftUpReviews(totReviews)}>
            <span className={styles.text}>&gt;</span>
          </div>
        </div>
      </div>
    );
  }
}

MorePages.propTypes = {
  reviews: PropTypes.any,
  maxNumReviews: PropTypes.number.isRequired,
  shiftUpReviews: PropTypes.func.isRequired,
  shiftDownReviews: PropTypes.func.isRequired,
};

export default MorePages;
