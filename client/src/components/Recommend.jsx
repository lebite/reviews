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
    const { avgRecRating } = recLevel;
    const { rec, rec2 } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.noiseoverall}>
          {{ avgRecRating }.avgRecRating > 50 ? <FiThumbsUp /> : <FiThumbsDown />}
          <span className={rec} onMouseEnter={this.mouseOver} onMouseOut={this.mouseOut}>
            &nbsp;
            {avgRecRating}
            % of people
            <span className={rec2}>&nbsp;would recommend it to a friend</span>
          </span>
        </div>
      </div>
    );
  }
}

Recommend.propTypes = {
  recLevel: PropTypes.shape({
    avgRecRating: PropTypes.number,
  }).isRequired,
};


export default Recommend;
