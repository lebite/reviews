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
    };
    this.handleReviews = this.handleReviews.bind(this);
    this.handleSortedReviews = this.handleSortedReviews.bind(this);
  }

  componentDidMount() {
    this.handleReviews();
  }

  handleReviews() {
    axios.get('/80/reviews')
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortedReviews(sort) {
    console.log(sort)
    axios.get('/80/reviews', {
      params: {
        sort: sort
      }
    })
    .then((reviews) => {
      this.setState({ reviews: reviews.data});
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
