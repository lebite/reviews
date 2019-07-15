import React from 'react';
import { FiMessageSquare, FiFlag } from 'react-icons/fi';
import { FaRegCaretSquareUp } from 'react-icons/fa';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import styles from './style/indivReview.css';


class IndivReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: Math.floor(Math.random() * Math.floor(4)),
      height: 0,
      showReport: false,
      increasedCount: false,
      showRestOfText: false,
    };
    this.colors = ['#df4e96', '#d86441', '#6c8ae4', '#bb6acd'];
    this.toggleShowReport = this.toggleShowReport.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.showRestOfText = this.showRestOfText.bind(this);
  }

  componentDidMount() {
    const height = this.divElement.scrollHeight;
    this.setState({ height: height / 24 });
  }

  toggleShowReport() {
    this.setState(state => ({ showReport: !state.showReport }));
  }

  increaseCount() {
    this.setState(state => ({ increasedCount: !state.increasedCount }));
    this.changeCount();
  }

  changeCount() {
    const { increasedCount } = this.state;
    const { review, handleHelpfulCount } = this.props;
    const { reviewID, reviewHelpfulCount } = review;
    if (!{ increasedCount }.increasedCount) {
      handleHelpfulCount('increase', { reviewID }.reviewID, { reviewHelpfulCount }.reviewHelpfulCount);
    } else {
      handleHelpfulCount('decrease', { reviewID }.reviewID, { reviewHelpfulCount }.reviewHelpfulCount);
    }
  }

  showRestOfText() {
    this.setState(state => ({ showRestOfText: !state.showRestOfText }));
  }

  render() {
    const { showReport, increasedCount, showRestOfText } = this.state;
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
      reviewHelpfulCount,
    } = review;

    const { color, height } = this.state;

    const starRates = reviewOverallRating;

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
            {' '}
            { userTotalReviews }
            {' '}
            {userTotalReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>
        <div className={styles.reviewWrapper}>
          <div className={styles.reviewWrapperUpper}>
            <div className={styles.reviewRating}>
              <div className={styles.stars}>
                {arr.map((aech, index) => (
                  <span className={styles.icon} key={index}>
                    <span className={styles.fullStyleRed} data-content="&#9733;">&#9733;</span>
                  </span>
                ))}
                {arrrem.map((each, index) => (
                  <span className={styles.icon} key={index}>
                    <span className={styles.fullStyleGrey} data-content="&#9733;">&#9733;</span>
                  </span>
                ))}
              </div>
              &nbsp;&#183;&nbsp;
              <span className={styles.dineDate}>
                Dined on&nbsp;
                {new Date(reviewDate).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
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
          </div>

          {showRestOfText
            ? (
              <div className={styles.textBodyShow}>
                <p className={styles.text} ref={(divElement) => { this.divElement = divElement; }}>
                  { reviewBody }
                </p>
              </div>
            )
            : (
              <div className={styles.textBodyHide}>
                <p className={styles.text} ref={(divElement) => { this.divElement = divElement; }}>
                  { reviewBody }
                </p>
              </div>
            )
          }

          <div>
            <div className={styles.main}>
              {height > 3
                ? (
                  <div>
                    {showRestOfText
                      ? <a className={styles.readMore} onClick={this.showRestOfText}>- Read Less</a>
                      : <a className={styles.readMore} onClick={this.showRestOfText}>+ Read More</a>
                    }
                  </div>
                )
                : <div />
              }
              <div className={styles.right}>
                <div className={styles.report}>
                  <div>
                    <FiFlag />
                  </div>
                  <div className={styles.reportText} onClick={this.toggleShowReport}>
                    Report
                  </div>
                </div>
                <div className={styles.helpful}>
                  {{ increasedCount }.increasedCount
                    ? (
                      <div style={{ color: 'red' }}>
                        <FaRegCaretSquareUp />
                      </div>
                    )
                    : (
                      <div>
                        <FaRegCaretSquareUp />
                      </div>
                    )}

                  <div className={styles.reportText} onClick={this.increaseCount}>
                    Helpful (
                    {reviewHelpfulCount}
                    )
                  </div>
                </div>
                {{ showReport }.showReport
                  ? (
                    <div className={styles.reviewReport}>
                      <div className={styles.reviewReportHeader}>
                        <div className={styles.reviewReportHeaderText}>Report this review as inappropriate?</div>
                      </div>
                      <div className={styles.reviewReportBody}>
                        <div className={styles.reviewReportBodyText}>
                          If you believe this review should be removed from OpenTable, please let us know and someone will investigate.
                        </div>
                        <form>
                          <textarea className={styles.reviewReportForm} placeholder="Tell us why you find the review inappropriate." />
                          <div className={styles.reviewReportFormButtons}>
                            <button className={styles.submitButton} type="submit">Report</button>
                            <button className={styles.cancelButton} type="button" onClick={this.toggleShowReport}>Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )
                  : null}
              </div>
            </div>
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
