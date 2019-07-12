import React from 'react';
import PropTypes from 'prop-types';
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
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseEnter(num) {
    this.setState({ [num]: styles.hover });
  }

  onMouseOut(num) {
    this.setState({ [num]: styles.indivRating });
  }

  onClick(rating) {
    const { handleRatingButton } = this.props;
    { handleRatingButton(rating); }
  }

  render() {
    const { reviews } = this.props;
    const widths = [0, 0, 0, 0, 0];
    let finwidth = '';

    if ({ reviews }.reviews.length > 0) {
      for (let i = 0; i < { reviews }.reviews.length; i += 1) {
        const rate = Math.floor({ reviews }.reviews[i].reviewOverallRating);
        if (rate === 1) {
          widths[0] += 1;
        } else if (rate === 2) {
          widths[1] += 1;
        } else if (rate === 3) {
          widths[2] += 1;
        } else if (rate === 4) {
          widths[3] += 1;
        } else if (rate === 5) {
          widths[4] += 1;
        }
      }
      finwidth = widths.map((num) => {
        const val = Math.ceil(num / { reviews }.reviews.length * 100);
        return `${val}%`;
      });
    } else {
      finwidth = ['0%', '0%', '0%', '0%', '0%'];
    }

    const arr = [{ style: finwidth[4], num: 'five', actnum: 5 }, { style: finwidth[3], num: 'four', actnum: 4 }, { style: finwidth[2], num: 'three', actnum: 3 }, { style: finwidth[1], num: 'two', actnum: 2 }, { style: finwidth[0], num: 'one', actnum: 1 }];

    return (
      <div className={styles.container}>
        {arr.map(each => (
          <div className={styles.reviewUpdateParameter}>
            <span className={styles.reviewNumber}>{each.actnum}</span>
            <div className={this.state[each.num]} onMouseEnter={() => this.onMouseEnter(each.num)} onMouseOut={() => this.onMouseOut(each.num)} onClick={() => this.onClick(`${each.actnum} stars`)}>
              <span className={styles.indivRatingInside} style={{ width: each.style }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ReviewsChart.propTypes = {
  reviews: PropTypes.arrayOf.isRequired,
  handleRatingButton: PropTypes.func.isRequired,
};

export default ReviewsChart;
