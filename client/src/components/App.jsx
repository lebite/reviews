import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import Reviews from './Reviews.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviews: '',
    };
    this.handleReviews = this.handleReviews.bind(this);
  }

  componentDidMount() {
    this.handleReviews();
  }

  // eslint-disable-next-line class-methods-use-this
  handleReviews() {
    axios.get('/1/reviews')
      .then((reviews) => {
        console.log('these are the reviews', Array.isArray(reviews.data));
        this.setState({ reviews: reviews.data });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <Header reviews={this.state.reviews}/>
          <Reviews reviews={this.state.reviews} />
        </div>

      </div>
    );
  }
}

export default App;
