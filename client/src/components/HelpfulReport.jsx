import React from 'react';
import PropTypes from 'prop-types';
import { FiFlag } from 'react-icons/fi';
import { FaRegCaretSquareUp } from 'react-icons/fa';
import styles from './style/helpfulreport.css';

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReport: false,
      increasedCount: false,
      report: styles.reportText,
      helpful: styles.reportText,
    };
    this.toggleShowReport = this.toggleShowReport.bind(this);
    this.increaseCount = this.increaseCount.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseEnter(param) {
    this.setState({ [param]: styles.reportTextRed });
  }

  onMouseOut(param) {
    this.setState({ [param]: styles.reportText });
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
      { handleHelpfulCount('increase', { reviewID }.reviewID, { reviewHelpfulCount }.reviewHelpfulCount); }
    } else {
      { handleHelpfulCount('decrease', { reviewID }.reviewID, { reviewHelpfulCount }.reviewHelpfulCount); }
    }
  }

  render() {
    const {
      showReport, increasedCount, report, helpful,
    } = this.state;
    const { review } = this.props;
    const { reviewHelpfulCount } = review;

    return (
      <div className={styles.main}>
        <div className={styles.left} />
        <div className={styles.right}>
          <div className={styles.report}>
            <div>
              <FiFlag />
            </div>
            <div className={report} onClick={this.toggleShowReport} onMouseEnter={() => this.onMouseEnter('report')} onMouseOut={() => this.onMouseOut('report')}>
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

            <div className={helpful} onClick={this.increaseCount} onMouseEnter={() => this.onMouseEnter('helpful')} onMouseOut={() => this.onMouseOut('helpful')}>
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
    );
  }
}

HelpfulReport.propTypes = {
  review: PropTypes.shape({
    reviewID: PropTypes.number,
    reviewHelpfulCount: PropTypes.number,
  }).isRequired,
  handleHelpfulCount: PropTypes.func.isRequired,
};

export default HelpfulReport;
