import React from 'react';
import styles from './style/noise.css';

class Noise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: styles.noise,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({ color: styles.noisered });
  }

  mouseOut() {
    this.setState({ color: styles.noise });
  }

  render() {
    let noise = '';
    if (this.props.noiseLevel.avg_noise_rating === 1) {
      noise='Do Not Recall';
    } else if (this.props.noiseLevel.avg_noise_rating === 2) {
      noise= 'Quiet';
    } else if (this.props.noiseLevel.avg_noise_rating === 3) {
      noise= 'Moderate';
    } else if (this.props.noiseLevel.avg_noise_rating === 4) {
      noise= 'Energetic';
    }

    return (
      <div>
        <span className={this.state.color} onMouseEnter= {this.mouseOver} onMouseOut={this.mouseOut}>
          Noise&nbsp;&#183;&nbsp;
          <span id={styles.noise2}>{noise}</span>
        </span>
      </div>
    );
  }
}

export default Noise;
