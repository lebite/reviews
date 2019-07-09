import React from 'react';
import styles from './style/neighborhood.css'

class Neighborhood extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <a href = "#" className ={styles.header_neighborhood}>Best Restaurants in SOMA › </a>
    );
  }
}

export default Neighborhood;