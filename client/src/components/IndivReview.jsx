import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import styles from './style/indivReview.css';
import HelpfulReport from './HelpfulReport.jsx';


class IndivReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: Math.floor(Math.random() * Math.floor(4)),
    };
    this.colors = ['#df4e96', '#d86441', '#6c8ae4', '#bb6acd'];
  }

  render() {
    const { review, handleHelpfulCount } = this.props;
    const {
      reviewFoodRating,
      reviewServiceRating,
      reviewAmbienceRating,
      userName,
      userLocation,
      userTotalReviews,
      reviewDate,
      reviewOverallRating,
      reviewBody,
    } = review;

    const { color } = this.state;

    const starRates = { reviewOverallRating }.reviewOverallRating;

    const arr = [];
    const arrrem = [];
    const emptystars = 5 - starRates;
    const totnumstars = starRates;

    for (let i = 0; i < totnumstars; i += 1) {
      arr.push(0);
    }
    for (let j = 0; j < emptystars; j += 1) {
      arrrem.push(0);
    }

    return (
      <div className={styles.reviewBody}>
        <div className={styles.sideBar}>
          <Avatar className={styles.avatar} name={userName} color={this.colors[{ color }]} size="48px" round="100px" />
          <span className={styles.userName}>{ userName }</span>
          <span className={styles.userLocation}>{ userLocation }</span>
          <span className={styles.userTotalReviews}>
            <FiMessageSquare />
            { userTotalReviews }
            &nbsp;
            {{ userTotalReviews }.userTotalReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        <div>
          <div className={styles.reviewRating}>
            <div className={styles.stars}>
              {arr.map(() => (
                <icon className={styles.icon}>
                  <span className={styles.fullStyleRed} data-content="&#9733;">&#9733;</span>
                </icon>
              ))}
              {arrrem.map(() => (
                <icon className={styles.icon}>
                  <span className={styles.fullStyleGrey} data-content="&#9733;">&#9733;</span>
                </icon>
              ))}
            </div>
            &nbsp;&#183;&nbsp;
            <span className={styles.dineDate}>
              Dined on&nbsp;
              {new Date({ reviewDate }.reviewDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className={styles.ratings}>
            <span className={styles.ratingsText}> Overall </span>
            <span className={styles.ratingsNum}>
              { reviewOverallRating }
            </span>
            <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Food </span>
            <span className={styles.ratingsNum}>
              { reviewFoodRating }
            </span>
            <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Service </span>
            <span className={styles.ratingsNum}>
              { reviewServiceRating }
            </span>
            <span className={styles.ratingsText}> &nbsp;&#183;&nbsp; Ambience </span>
            <span className={styles.ratingsNum}>
              { reviewAmbienceRating }
            </span>
          </div>
          <p>
            { reviewBody }
          </p>
          <div>
            <HelpfulReport review={review} handleHelpfulCount={handleHelpfulCount} />
          </div>
        </div>
      </div>
    );
  }
}

IndivReview.propTypes = {
  review: PropTypes.shape({
    reviewFoodRating: PropTypes.number,
    reviewServiceRating: PropTypes.number,
    reviewAmbienceRating: PropTypes.number,
    reviewValueRating: PropTypes.number,
    userName: PropTypes.string,
    userLocation: PropTypes.string,
    userTotalReviews: PropTypes.number,
    reviewDate: PropTypes.string,
    reviewOverallRating: PropTypes.number,
    reviewBody: PropTypes.string,
  }).isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
};

export default IndivReview;
