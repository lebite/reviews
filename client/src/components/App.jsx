import React from 'react';
import axios from 'axios';
import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';
import styles from './style/app.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      randRestID: Math.floor(Math.random() * 100) + 1,
    };
    this.handleReviews = this.handleReviews.bind(this);
    this.handleSortedReviews = this.handleSortedReviews.bind(this);
    this.handleHelpfulCount = this.handleHelpfulCount.bind(this);
  }

  componentDidMount() {
    this.handleReviews();
  }

  handleReviews() {
    const { randRestID } = this.state;
    axios.get(`/${randRestID}/reviews`)
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortedReviews(sort) {
    const { randRestID } = this.state;
    axios.get(`/${randRestID}/reviews`, {
      params: {
        sort,
      },
    })
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleHelpfulCount(param, id, revcount) {
    const { randRestID } = this.state;
    let count;
    param === 'increase' ? count = revcount + 1 : revcount === 0 ? count = 0 : count = revcount - 1;

    axios.patch(`/${randRestID}/reviews`, {
      id,
      count,
    })
      .then(() => {
        this.handleReviews();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className={styles.master}>
        <div>
          <Summary reviews={reviews} />
          <Reviews reviews={reviews} handleSortedReviews={this.handleSortedReviews} handleHelpfulCount={this.handleHelpfulCount} />
        </div>
      </div>
    );
  }
}

export default App;
