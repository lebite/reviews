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
      justReviews: [],
      starRatingButton: null,
      sort: 'newest',
      stars: undefined,
    };
    this.sort = 'newest';
    this.keyword = '';
    this.stars = undefined;
    this.handleReviews = this.handleReviews.bind(this);
    this.handleSortedReviews = this.handleSortedReviews.bind(this);
    this.handleHelpfulCount = this.handleHelpfulCount.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
  }

  componentDidMount() {
    this.handleReviews();
  }

  handleReviews() {
    const { randRestID } = this.state;
    axios.get(`/${randRestID}/reviews`)
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
        axios.get(`/${randRestID}/reviews`, {
          params: {
            sort: 'newest',
          },
        })
          .then((indivRev) => {
            this.setState({ justReviews: indivRev.data });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSortedReviews(sort, keyword, stars) {
    if (sort !== null) {
      this.setState({ sort: sort })
      this.sort = sort;
    }
    console.log('this is sort', this.sort)

    if (keyword !== undefined) {
      this.keyword = keyword;
    }
    console.log('this is keyword', this.keyword)

    if (stars !== undefined) {
      this.setState({ stars: stars })
      this.stars = stars
    }
    console.log('this is stars',this.stars)

    const { randRestID } = this.state;
    axios.get(`/${randRestID}/reviews`, {
      params: {
        sort: this.sort,
        keyword: this.keyword,
        stars: this.stars
      },
    })
      .then((reviews) => {
        this.setState({ justReviews: reviews.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRatingButton(starRating) {
    console.log('second click', starRating)
    this.setState({starRatingButton: starRating});
    let numStars = '';
    if (starRating) {
      numStars = starRating.slice(0,1);
    } else {
      numStars = starRating;
    }
    this.handleSortedReviews(null, undefined, numStars);

  }

  handleHelpfulCount(param, id, revcount) {
    const { randRestID } = this.state;
    let count;
    param === 'increase' ? count = revcount + 1 : count = revcount - 1;

    axios.patch(`/${randRestID}/reviews`, {
      id,
      count,
    })
      .then(() => {
        this.handleSortedReviews(this.state.sort);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    const { reviews, justReviews, sort, starRatingButton, stars } = this.state;
    return (
      <div className={styles.master}>
        <div>
          <Summary reviews={reviews} handleRatingButton={this.handleRatingButton}/>
          <Reviews reviews={reviews} justReviews={justReviews} handleSortedReviews={this.handleSortedReviews} handleHelpfulCount={this.handleHelpfulCount} sortOption={sort} starRatingButton={starRatingButton} handleRatingButton={this.handleRatingButton} stars={stars}/>
        </div>
      </div>
    );
  }
}

export default App;
