import React from 'react';
import axios from 'axios';
import Summary from './Summary.jsx';
import Reviews from './Reviews.jsx';
import styles from './style/app.css';

class App extends React.Component {
  constructor() {
    super();
    let id = location.pathname.slice(1);
    id = (id !== '') ? parseInt(id) : Math.floor(Math.random() * 100);
    this.state = {
      reviews: [],
      randRestID: id,
      justReviews: [],
      starRatingButton: null,
      sort: 'Newest',
      stars: undefined,
      searchLength: 0,
      zerotf: false,
    };
    this.sort = 'newest';
    this.keyword = '';
    this.stars = undefined;
    this.handleReviews = this.handleReviews.bind(this);
    this.handleSortedReviews = this.handleSortedReviews.bind(this);
    this.handleHelpfulCount = this.handleHelpfulCount.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
    this.changezerotf = this.changezerotf.bind(this);
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
            this.setState({ searchLength: indivRev.data[0].restaurantTotalReviews })
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
      this.setState({ sort });
      this.sort = sort;
    }

    if (keyword !== undefined) {
      this.keyword = keyword;
    }

    if (stars !== undefined) {
      this.setState({ stars });
      this.stars = stars;
    }

    const { randRestID } = this.state;
    axios.get(`/${randRestID}/reviews`, {
      params: {
        sort: this.sort,
        keyword: this.keyword,
        stars: this.stars,
      },
    })
      .then((reviews) => {
        this.setState({ justReviews: reviews.data });
        this.setState({ searchLength: reviews.data.length })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRatingButton(starRating) {
    this.setState({ starRatingButton: starRating });
    let numStars = '';
    if (starRating) {
      numStars = starRating.slice(0, 1);
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
        const { sort } = this.state;
        this.handleSortedReviews(this.sort);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changezerotf () {
    this.setState(state => ({ zerotf: !state.zerotf}))
  }


  render() {
    const {
      reviews, justReviews, sort, starRatingButton, stars, searchLength, zerotf
    } = this.state;
    return (
      <div className={styles.master}>
        <div>
          <Summary reviews={reviews} handleRatingButton={this.handleRatingButton} changezerotf={this.changezerotf}/>
          <Reviews reviews={reviews} justReviews={justReviews} handleSortedReviews={this.handleSortedReviews} handleHelpfulCount={this.handleHelpfulCount} sortOption={sort} starRatingButton={starRatingButton} handleRatingButton={this.handleRatingButton} stars={stars} searchLength={searchLength} zerotf={zerotf}/>
        </div>
      </div>
    );
  }
}

export default App;
