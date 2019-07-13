import React from 'react';
import PropTypes from 'prop-types';
import IndivReview from './IndivReview.jsx';
import DropdownFilter from './DropdownFilter.jsx';
import ButtonFilter from './ButtonFilter.jsx';
import styles from './style/reviews.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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

    return (
      <div>
        <div className={styles.reviewToolbar}>
          <div className={styles.filters}>Sort by</div>
          <DropdownFilter handleSortedReviews={handleSortedReviews} stars={stars} />
          <div className={styles.filters}>Filters</div>
          <ButtonFilter reviews={reviews} handleSortedReviews={handleSortedReviews} sortOption={sortOption} starRatingButton={starRatingButton} handleRatingButton={handleRatingButton} stars={stars} />
        </div>
        <div className={styles.reviewContent}>
          {{ justReviews }.justReviews.length > 0
            ? { justReviews }.justReviews.map(each => <IndivReview key={each.reviewID} review={each} handleHelpfulCount={handleHelpfulCount} />)
            : null
          }
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.array,
  justReviews: PropTypes.array,
  handleSortedReviews: PropTypes.func.isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  starRatingButton: PropTypes.string,
  handleRatingButton: PropTypes.func.isRequired,
  stars: PropTypes.string,
};

Reviews.defaultProps = {
  stars: null,
};

export default Reviews;
