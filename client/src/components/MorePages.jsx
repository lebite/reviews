import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/morepages.css';

class MorePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
      showBegDots: false,
      showEndDots: true,
      longArr: {beg: [1,2,3], mid: [], end: []}

    };
    this.changeDots = this.changeDots.bind(this);
    this.changeDotsLong = this.changeDotsLong.bind(this);
  }
  // componentDidUpdate() {
  //   this.setState({ longArr: [[1,2,3],[],[this.props.reviews[0] ? this.props.reviews[0].restaurantTotalReviews / this.props.maxNumReviews : 5]]})
  // }
  changeDots(num) {
    const { shiftNumberReviews } = this.props
    if ( num === 1) {
      this.setState( state => ({ showEndDots: true}))
      this.setState( state => ({ showBegDots: false}))
    } else if ( num === 2 || num === 3 ) {
      this.setState( state => ({ showBegDots: false}))
      this.setState( state => ({ showEndDots: false}))
    } else if ( num === 4 ) {
      this.setState( state => ({ showBegDots: true}))
      this.setState( state => ({ showEndDots : false}))
    }
    shiftNumberReviews(num)
  }

  changeDotsLong(num, length) {
    if ( num === 1 || num === 2 ) {
      this.setState({ longArr: [[1,2,3],[],[length]] });
    } else if ( num === 3 ) {
      this.setState({ beg: [1,2,3,4]})
    }
  }

  render() {
    const {
      reviews,
      maxNumReviews,
      shiftUpReviews,
      shiftDownReviews,
      shiftNumberReviews,
    } = this.props;

    const { showBegDots, showEndDots, longArr } = this.state;

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
        : arr.length === 4 ? <div className={styles.buttonContainer}>
          <div className={styles.button} onClick={() => this.changeDots(1)}>
            <span className={styles.text}>1</span>
          </div>
          { showBegDots
          ? <div className={styles.dotWrapper}>
            <span>⋯</span>
          </div>
          : null }
          <div className={styles.button} onClick={() => this.changeDots(2)}>
            <span className={styles.text}>2</span>
          </div>
          <div className={styles.button} onClick={() => this.changeDots(3)}>
            <span className={styles.text}>3</span>
          </div>
          { showEndDots
          ? <div className={styles.dotWrapper}>
            <span>⋯</span>
          </div>
          : null }
          <div className={styles.button} onClick={() => this.changeDots(4)}>
            <span className={styles.text}>4</span>
          </div>
        </div>
        : arr.length >= 5
        ? <div className={styles.buttonContainer}>
            <div>
              {[1,2,3,'...',7].map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong({each}, arr.length)}>
                  <span className={styles.text}>{each}</span>
                </div>
              ))}
            </div>
            {/* <div>
              {longArr.mid.map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong({each}, arr.length)}>
                  <span className={styles.text}>{each}</span>
                </div>
              ))}
            </div> */}
            {/* <div>
              {(longArr.end.length === 0 ? arr.length : longArr.end).map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong({each}, arr.length)}>
                  <span className={styles.text}>{each}</span>
                </div>
              ))}
            </div> */}
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
