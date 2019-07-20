import React from 'react';
import PropTypes from 'prop-types';
import IndivReview from './IndivReview.jsx';
import DropdownFilter from './DropdownFilter.jsx';
import ButtonFilter from './ButtonFilter.jsx';
import MorePages from './MorePages.jsx';
import styles from './style/reviews.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startNumReview: 0,
      maxNumReviews: 15,
      totalNumReviews:'',
    };
    this.shiftUpReviews = this.shiftUpReviews.bind(this);
    this.shiftDownReviews = this.shiftDownReviews.bind(this);
    this.shiftNumberReviews = this.shiftNumberReviews.bind(this);
    this.resetZero = this.resetZero.bind(this);
  }


  shiftUpReviews(maxReviews) {
    const num = this.state.startNumReview + this.state.maxNumReviews;
    if (num < maxReviews) {
      this.setState(state => ({ startNumReview: state.startNumReview + state.maxNumReviews }));
    }
    var element = document.getElementById("gohere");
    element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  shiftDownReviews() {
    if (this.state.startNumReview > 0) {
      this.setState(state => ({ startNumReview: state.startNumReview - state.maxNumReviews }));
    }
    var element = document.getElementById("gohere");
    element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  shiftNumberReviews(pageNum) {
    let num = 0;
    typeof pageNum === 'object' ? num = pageNum.each : num = pageNum
    const start = num * this.state.maxNumReviews - this.state.maxNumReviews
    this.setState({ startNumReview: start });
    var element = document.getElementById("gohere");
    element.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }

  resetZero() {
    this.setState({ startNumReview: 0 })
  }

  componentWillReceiveProps() {
    if (this.props.zerotf) {
      this.resetZero();
    }
  }

  render() {
    const {
      reviews,
      justReviews,
      handleSortedReviews,
      handleHelpfulCount,
      sortOption,
      starRatingButton,
      handleRatingButton,
      restaurantTotalReviews,
      stars,
      searchLength,
    } = this.props;

    const { startNumReview, maxNumReviews, totalNumReviews } = this.state;

    return (
      <div id="gohere">
        <div className={styles.reviewToolbar}>
          <div className={styles.filters}>Sort by</div>
          <DropdownFilter handleSortedReviews={handleSortedReviews} stars={stars} resetZero={this.resetZero}/>
          <div className={styles.filters}>Filters</div>
          <ButtonFilter
            reviews={reviews}
            handleSortedReviews={handleSortedReviews}
            sortOption={sortOption}
            starRatingButton={starRatingButton}
            handleRatingButton={handleRatingButton}
            stars={stars}
            resetZero={this.resetZero}
            searchLength={searchLength}
          />
        </div>
        <div className={styles.reviewContent}>
          {justReviews.length > 0
            ? justReviews.slice(startNumReview, startNumReview + maxNumReviews - 1).map(each => (
              <IndivReview
                key={each.reviewID}
                review={each}
                handleHelpfulCount={handleHelpfulCount}
              />
            ))
            : null
          }
        </div>
        <MorePages reviews={reviews} maxNumReviews={maxNumReviews} shiftUpReviews={this.shiftUpReviews} shiftDownReviews={this.shiftDownReviews} shiftNumberReviews={this.shiftNumberReviews} searchLength={searchLength}/>

      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.any,
  justReviews: PropTypes.any,
  handleSortedReviews: PropTypes.func.isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  starRatingButton: PropTypes.string,
  handleRatingButton: PropTypes.func.isRequired,
  restaurantTotalReviews: PropTypes.any,
  stars: PropTypes.string,
};

export default Reviews;
