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
    const { reviews, handleSortedReviews, handleHelpfulCount } = this.props;
    return (
      <div>
        <div className={styles.reviewToolbar}>
          <div className={styles.filters}>Sort by</div>
          <DropdownFilter handleSortedReviews={handleSortedReviews} />
          <div className={styles.filters}>Filters</div>
          <ButtonFilter reviews={reviews} />
        </div>
        <div className={styles.reviewContent}>
          {{ reviews }.reviews.length > 0
            ? { reviews }.reviews.map(each => <IndivReview key={each.reviewID} review={each} handleHelpfulCount={handleHelpfulCount} />)
            : null
          }
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf.isRequired,
  handleSortedReviews: PropTypes.func.isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
};

export default Reviews;
