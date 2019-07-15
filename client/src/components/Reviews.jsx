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
      maxNumReviews: 10,
    };
    this.shiftUpReviews = this.shiftUpReviews.bind(this);
    this.shiftDownReviews = this.shiftDownReviews.bind(this);
  }


  shiftUpReviews() {
    this.setState(state => ({ startNumReview: state.startNumReview + state.maxNumReviews }));
    // this.setState(state => ({ endNumReview: state.endNumReview + state.maxNumReviews }));
  }

  shiftDownReviews() {
    this.setState(state => ({ startNumReview: state.startNumReview - state.maxNumReviews }));
    // this.setState(state => ({ endNumReview: state.endNumReview - state.maxNumReviews }));
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
      stars,
    } = this.props;

    // const { restaurantTotalReviews } = reviews;
    const { startNumReview, maxNumReviews } = this.state;

    return (
      <div>
        <div className={styles.reviewToolbar}>
          <div className={styles.filters}>Sort by</div>
          <DropdownFilter handleSortedReviews={handleSortedReviews} stars={stars} />
          <div className={styles.filters}>Filters</div>
          <ButtonFilter
            reviews={reviews}
            handleSortedReviews={handleSortedReviews}
            sortOption={sortOption}
            starRatingButton={starRatingButton}
            handleRatingButton={handleRatingButton}
            stars={stars}
          />
        </div>
        <div className={styles.reviewContent}>
          {justReviews.length > 0
            ? justReviews.slice(startNumReview, startNumReview + maxNumReviews).map(each => (
              <IndivReview
                key={each.reviewID}
                review={each}
                handleHelpfulCount={handleHelpfulCount}
              />
            ))
            : null
          }
        </div>
        {/* { reviews.restaurantTotalReviews > maxNumReviews ? */}
        <MorePages reviews={reviews} maxNumReviews={maxNumReviews} shiftUpReviews={this.shiftUpReviews} shiftDownReviews={this.shiftDownReviews} />
          {/* : nul .l} */}

      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf.isRequired,
  justReviews: PropTypes.arrayOf().isRequired,
  handleSortedReviews: PropTypes.func.isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  starRatingButton: PropTypes.string.isRequired,
  handleRatingButton: PropTypes.func.isRequired,
  stars: PropTypes.string,
};

Reviews.defaultProps = {
  stars: null,
};

export default Reviews;
