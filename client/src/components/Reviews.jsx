/* eslint-disable import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import IndivReview from './IndivReview.jsx';
import DropdownFilter from './DropdownFilter.jsx';
import styles from './style/reviews.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { reviews } = this.props;
    return (
      <div>
        <div className={styles.reviewToolbar}>
          <div className={styles.filters}>Sort by</div>
          <DropdownFilter />
          <div className={styles.filters}>Filters</div>
          {/* <ButtonFilter /> */}
        </div>
        <div className={styles.reviewContent}>
          {{ reviews }.reviews.length > 0
            ? { reviews }.reviews.map(each => <IndivReview key={each.review_id} review={each} />)
            : null
          }
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf.isRequired,
};

export default Reviews;
