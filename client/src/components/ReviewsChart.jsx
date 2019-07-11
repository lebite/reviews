import React from 'react';
import styles from './style/reviewschart.css';

class ReviewsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      one: styles.indivRating,
      two: styles.indivRating,
      three: styles.indivRating,
      four: styles.indivRating,
      five: styles.indivRating,
    }
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseEnter(num) {
    this.setState({[num]: styles.hover});
  }

  onMouseOut(num) {
    this.setState({[num]: styles.indivRating});
  }

  render() {
    const widths = [0,0,0,0,0];
    let finwidth = '';

    if(this.props.reviews.length>0) {
      for (var i = 0; i<this.props.reviews.length; i++) {
        var rate = Math.floor(this.props.reviews[i].reviewOverallRating)
        if (rate === 1) {
          widths[0] += 1;
        } else if ( rate === 2 ) {
          widths[1] += 1;
        } else if ( rate === 3 ) {
          widths[2] += 1;
        } else if ( rate === 4 ) {
          widths[3] += 1;
        } else if ( rate === 5 ) {
          widths[4] += 1;
        }
      }
      finwidth = widths.map((num) => {
        let val = Math.ceil(num / this.props.reviews.length * 100);
        return val+'%';
      })
    } else {
      finwidth = ['0%','0%','0%','0%','0%']
    }

    return (
      <div className={styles.container}>

        <div className={styles.reviewUpdateParameter}>
          <span className={styles.reviewNumber}>5</span>
          <div className={this.state.five} onMouseEnter={() => this.onMouseEnter('five')} onMouseOut={() => this.onMouseOut('five')}>
            <span className={styles.indivRatingInside} style={{width: finwidth[4]}}></span>
          </div>
        </div>

        <div className={styles.reviewUpdateParameter}>
          <span className={styles.reviewNumber}>4</span>
          <div className={this.state.four} onMouseEnter={() => this.onMouseEnter('four')} onMouseOut={() => this.onMouseOut('four')}>
            <span className={styles.indivRatingInside} style={{width: finwidth[3]}}></span>
          </div>
        </div>

        <div className={styles.reviewUpdateParameter}>
          <span className={styles.reviewNumber}>3</span>
          <div className={this.state.three} onMouseEnter={() => this.onMouseEnter('three')} onMouseOut={() => this.onMouseOut('three')}>
            <span className={styles.indivRatingInside} style={{width: finwidth[2]}}></span>
          </div>
        </div>

        <div className={styles.reviewUpdateParameter}>
          <span className={styles.reviewNumber}>2</span>
          <div className={this.state.two} onMouseEnter={() => this.onMouseEnter('two')} onMouseOut={() => this.onMouseOut('two')}>
            <span className={styles.indivRatingInside} style={{width: finwidth[1]}}></span>
          </div>
        </div>

        <div className={styles.reviewUpdateParameter}>
          <span className={styles.reviewNumber}>1</span>
          <div className={this.state.one} onMouseEnter={() => this.onMouseEnter('one')} onMouseOut={() => this.onMouseOut('one')}>
            <span className={styles.indivRatingInside} style={{width: finwidth[0]}}></span>
          </div>
        </div>

      </div>
    );
  }

};

export default ReviewsChart;
