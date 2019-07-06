import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component {
  constructor() {
    super();
    this.state = {
      rating_half_star: 3.5,
    };
    this.onStarClickHalfStar = this.onStarClickHalfStar.bind(this);
  }

  onStarClickHalfStar(e, nextValue, prevValue, name) {
    const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({ rating_half_star: nextValue });
  }

  render() {
    return (
      <StarRatingComponent
        name="overallrate"
        // eslint-disable-next-line react/destructuring-assignment
        value={this.state.rating_half_star}
        starCount={5}
        starColor="red"
        emptyStarColor="#f6f6f6"
        // onStarClick={this.onStarClickHalfStar}
        // renderStarIcon={(index, value) => (
        //   <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
        // )}
        // renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
      />
    );
  }
}

export default StarRating;
