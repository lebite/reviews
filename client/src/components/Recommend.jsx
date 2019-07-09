/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import styles from './style/noiseandrec.css';

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rec: styles.noise,
      rec2: styles.noise2,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({ rec: styles.noisered });
    this.setState({ rec2: styles.noise2red });
  }

  mouseOut() {
    this.setState({ rec: styles.noise });
    this.setState({ rec2: styles.noise2 });
  }

  render() {
    const { recLevel } = this.props;
    const { avg_rec_rating } = recLevel;
    const { rec, rec2 } = this.state;
    return (
      <div className={styles.noiseoverall}>
        {{ avg_rec_rating }.avg_rec_rating > 50 ? <FiThumbsUp /> : <FiThumbsDown />}
        <span className={rec} onMouseEnter={this.mouseOver} onMouseOut={this.mouseOut}>
          &nbsp;
          {avg_rec_rating}
          % of people
          <span className={rec2}>&nbsp;would recommend it to a friend</span>
        </span>
      </div>
    );
  }
}

Recommend.propTypes = {
  recLevel: PropTypes.shape({
    avg_rec_rating: PropTypes.number,
  }).isRequired,
};


export default Recommend;
