import React from 'react';
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
    return (
      <div className={styles.noiseoverall}>
        {this.props.recLevel.avg_rec_rating > 50 ? <FiThumbsUp /> : <FiThumbsDown />}
        <span className={this.state.rec} onMouseEnter= {this.mouseOver} onMouseOut={this.mouseOut}>
          &nbsp;{this.props.recLevel.avg_rec_rating}
          % of people
          <span className={this.state.rec2}>&nbsp;would recommend it to a friend</span>
        </span>
      </div>
    );
  }
}

export default Recommend;
