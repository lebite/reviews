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
    this.handleSortedReivews = this.handleSortedReivews.bind(this);
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
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  handleSortedReivews(sortparam) {
    axios.get('/80/reviews?sort=')
  }

  render() {
    const { reviews } = this.state;
    return (
      <div className={styles.master}>
        <div>
          <Summary reviews={reviews} />
          <Reviews reviews={reviews} />
        </div>
      </div>
    );
  }
}

export default App;
