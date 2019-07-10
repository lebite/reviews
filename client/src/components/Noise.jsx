import React from 'react';
import PropTypes from 'prop-types';
import { FiBarChart } from 'react-icons/fi';
import styles from './style/noiseandrec.css';

class Noise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: styles.noise,
      color2: styles.noise2,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({ color: styles.noisered });
    this.setState({ color2: styles.noise2red });
  }

  mouseOut() {
    this.setState({ color: styles.noise });
    this.setState({ color2: styles.noise2 });
  }

  render() {
    const { noiseLevel } = this.props;
    const { avgNoiseRating } = noiseLevel;
    const { color, color2 } = this.state;

    let noise = '';
    if ({ avgNoiseRating }.avgNoiseRating === 1) {
      noise = 'Do Not Recall';
    } else if ({ avgNoiseRating }.avgNoiseRating === 2) {
      noise = 'Quiet';
    } else if ({ avgNoiseRating }.avgNoiseRating === 3) {
      noise = 'Moderate';
    } else if ({ avgNoiseRating }.avgNoiseRating === 4) {
      noise = 'Energetic';
    }

    return (
      <div className={styles.noiseoverall}>
        <FiBarChart />
        <span className={color} onMouseEnter={this.mouseOver} onMouseOut={this.mouseOut}>
          Noise&nbsp;&#183;&nbsp;
          <span className={color2}>{noise}</span>
        </span>
      </div>
    );
  }
}

Noise.propTypes = {
  noiseLevel: PropTypes.shape({
    avgNoiseRating: PropTypes.number,
  }).isRequired,
};


export default Noise;
