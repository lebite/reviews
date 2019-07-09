import React from 'react';
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
      <div className={styles.noiseoverall}>
        <FiBarChart />
        <span className={this.state.color} onMouseEnter= {this.mouseOver} onMouseOut={this.mouseOut}>
          Noise&nbsp;&#183;&nbsp;
          <span className={this.state.color2}>{noise}</span>
        </span>
      </div>
    );
  }
}

export default Noise;
