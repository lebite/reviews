/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import StarRating from './StarRating.jsx';
import Noise from './Noise.jsx'
import styles from './style/header.css';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const numReviews = this.props.reviews[0] || {};
    return (
      <div className={styles.feed}>
        <div className={styles.feedlist}>
          What {numReviews.restaurant_total_reviews} people are saying
        </div>
        <div className={styles.header_lower}>
          <div>
            Overall ratings and reviews
          </div>
          <div className={styles.header_normal}>
            Reviews can only be made by diners who have eaten at this restaurant
          </div>
          <div>
            <StarRating rating={this.props.reviews} />
          </div>
          <div className={styles.overallrev}>
            <div className={styles.indiv}>
              <div className={styles.num}>{numReviews.avg_food_rating}</div>
              <div className={styles.text}>Food</div>
            </div>
            <div className={styles.indiv}>
              <div className={styles.num}>{numReviews.avg_service_rating}</div>
              <div className={styles.text}>Service</div>
            </div>
            <div className={styles.indiv}>
              <div className={styles.num}>{numReviews.avg_ambience_rating}</div>
              <div className={styles.text}>Ambience</div>
            </div>
            <div className={styles.indiv}>
              <div className={styles.num}>{numReviews.avg_value_rating}</div>
              <div className={styles.text}>Value</div>
            </div>
          </div>

          <div>
            <Noise noiseLevel={numReviews} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
