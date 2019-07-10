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
  }

  componentDidMount() {
    this.handleReviews();
  }

  handleReviews() {
    axios.get(`/${this.state.randRestID}/reviews`)
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortedReviews(sort) {
    axios.get(`/${this.state.randRestID}/reviews`, {
      params: {
        sort: sort,
      },
    })
    .then((reviews) => {
      this.setState({ reviews: reviews.data });
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
          <Reviews reviews={reviews} handleSortedReviews = {this.handleSortedReviews}/>
        </div>
      </div>
    );
  }
}

export default App;
