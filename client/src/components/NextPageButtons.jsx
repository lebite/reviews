import React from 'react';
import styles from './style/nextpagebuttons.css';

class NextPageButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length:0,
    };
  }

  render() {

    const { restaurantTotalReviews } = this.props;


    return (

      <div className={styles.container}>

        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <span className={styles.text}>&lt;</span>
          </div>
        </div>

        {restaurantTotalReviews < 40
        ? null
        : this.setState({ length: restaurantTotalReviews })
        }

        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <span className={styles.text}>{length}</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <span className={styles.text}>&gt;</span>
          </div>
        </div>

      </div>
    );
  }
}

export default NextPageButtons;
