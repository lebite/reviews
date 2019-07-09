/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import styles from './style/neighborhood.css';

class Neighborhood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      format: styles.header_neighborhood,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({ format: styles.header_neighborhood_underline });
  }

  mouseOut() {
    this.setState({ format: styles.header_neighborhood });
  }

  render() {
    const { format } = this.state;
    const {
      mouseOver, mouseOut,
    } = this;

    return (
      <a href="#" className={format} onMouseEnter={mouseOver} onMouseOut={mouseOut}>Best Restaurants in SOMA › </a>
    );
  }
}

export default Neighborhood;
