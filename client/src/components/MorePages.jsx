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
      shiftNumberReviews,
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

    const arr2=[];
    for (let j = 1; j <= 3; j += 1) {
      arr2.push(j);
    }
    // arr2.push('...')
    // arr2.push(numButtons)

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
            <div key={index} className={styles.button} onClick={() => shiftNumberReviews({each})}>
              <span className={styles.text}>{each}</span>
            </div>
          ))}
        </div>
        : <div className={styles.buttonContainer}>
        {arr2.map((each, index) => (
            <div key={index} className={styles.button} onClick={() => shiftNumberReviews({each})}>
              <span className={styles.text}>{each}</span>
            </div>
          ))}
          <div className={styles.dotWrapper}>
            <span>⋯</span>
          </div>
          <div className={styles.button} onClick={() => shiftNumberReviews(4)}>
            <span className={styles.text}>4</span>
          </div>
        </div> }

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
