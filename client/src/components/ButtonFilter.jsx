import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/buttonfilter.css'

class ButtonFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const words = 'suscipit, qui, molestias, ipsum';

    const wordarr = words.split(', ');
    console.log(wordarr)
    return (
      <div className={styles.container}>

        <span>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span>Good for groups</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span>{wordarr[0]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span>{wordarr[1]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span>{wordarr[2]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input className={styles.input} type="checkbox" />
            <span>{wordarr[3]}</span>
          </label>
        </span>
      </div>
    )
  }
}

export default ButtonFilter;
