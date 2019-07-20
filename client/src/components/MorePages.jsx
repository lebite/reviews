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
      longArr: {beg: [1,2,3], mid: [], end: []},
      dots: {beg: true, end: false},
    };
    this.changeDots = this.changeDots.bind(this);
    this.changeDotsLong = this.changeDotsLong.bind(this);
    this.handleScrollToElement = this.handleScrollToElement.bind(this);
  }

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
    this.handleScrollToElement();
  }

  changeDotsLong(num, length) {
    const { shiftNumberReviews } = this.props
    if ( num === 1 || num === 2 ) {
      this.setState({ longArr: {beg: [1,2,3], mid: [], end: [length]} });
      this.setState({ dots: {beg: true, end: false }})
    } else if ( num === 3 ) {
      this.setState({ longArr: {beg: [1,2,3,4], mid: [], end: [length]} });
      this.setState({ dots: {beg: true, end: false }})
    } else if ( num === length || num === length - 1) {
      this.setState({ longArr: {beg: [1], mid: [], end: [length-2, length-1, length]} });
      this.setState({ dots: {beg: true, end: false }})
    } else if ( num === length - 2 ) {
      this.setState({ longArr: {beg: [1], mid: [], end: [length-3, length-2, length-1, length]} });
      this.setState({ dots: {beg: true, end: false }})
    } else {
      this.setState({ longArr: {beg: [1], mid: [num-1, num, num+1], end: [length]} });
      this.setState({ dots: {beg: true, end: true }})
    }
    shiftNumberReviews(num)
    this.handleScrollToElement();
  }

  handleScrollToElement() {
    // const tesNode = ReactDOM.findDOMNode(this.refs.test)
    var element = document.getElementById("gohere");
    element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  render() {
    const {
      reviews,
      maxNumReviews,
      shiftUpReviews,
      shiftDownReviews,
      shiftNumberReviews,
      searchLength
    } = this.props;

    const { showBegDots, showEndDots, longArr, dots } = this.state;

    let totReviews = '';

    if (searchLength) {
      totReviews = searchLength
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
        ?
        <div className={styles.buttonContainer2}>
            <div>
              {longArr.beg.map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong(each, arr.length)}>
                  <a href="#gohere" style={{display: 'block'}}></a>
                  <span className={styles.text}>{each}</span>
                </div>
              ))}
            </div>
            {dots.beg ? <div className={styles.dotWrapper}><span>⋯</span></div> : null}
            <div>
              {longArr.mid.map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong(each, arr.length)}>
                  <a href="#gohere" style={{display: 'block'}}></a>
                  <span className={styles.text}>{each}</span>
                </div>
              ))}
            </div>
            {dots.end ? <div className={styles.dotWrapper}><span>⋯</span></div> : null}
            <div>
              {longArr.end.length > 0
              ? longArr.end.map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong(each, arr.length)}>
                  <span className={styles.text}>{each}</span>
                </div>
              ))
              : [arr.length].map((each, index) => (
                <div key={index} className={styles.button} onClick={() => this.changeDotsLong(each, arr.length)}>
                  <span className={styles.text}>{each}</span>
                </div>
              ))
              }
            </div>
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
