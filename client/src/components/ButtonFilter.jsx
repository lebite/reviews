import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/buttonfilter.css';

class ButtonFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstButton: false,
      secondButton: false,
      thirdButton: false,
      fourthButton: false,
      fifthButton: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeStarRating = this.onChangeStarRating.bind(this);
  }

  onChange(e, keyword) {
    const buttonName = e.target.name;

    this.setState(state => ({ [buttonName]: !state[buttonName] }));
    if (!this.state[buttonName]) {
      this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars);
    } else {
      this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    }
  }

  onChangeStarRating() {
    const { handleRatingButton } = this.props;
    { handleRatingButton(null); }
  }

  render() {
    const { reviews, starRatingButton } = this.props;

    let wordArr = '';
    if ({ reviews }.reviews.length > 0) {
      wordArr = { reviews }.reviews[0].keyWords.split(',');
    }

    const arr = [{ name: 'firstButton', text: 'Good for groups' }, { name: 'secondButton', text: wordArr[0] }, { name: 'thirdButton', text: wordArr[1] }, { name: 'fourthButton', text: wordArr[2] }, { name: 'fifthButton', text: wordArr[3] }];

    return (
      <div className={styles.container}>
        {{ starRatingButton }.starRatingButton
          ? (
            <span>
              <label className={styles.labelred}>
                <input name="starRating" className={styles.input} type="checkbox" checked onChange={this.onChangeStarRating} />
                <span>{starRatingButton}</span>
              </label>
            </span>
          )
          : null
        }

        {arr.map(each => (
          <span>
            {this.state[each.name]
              ? (
                <label className={styles.labelred}>
                  <input name={each.name} className={styles.input} type="checkbox" onChange={e => this.onChange(e, each.text)} checked />
                  <span className={styles.text}>{each.text}</span>
                </label>
              )
              : (
                <label className={styles.label}>
                  <input name={each.name} className={styles.input} type="checkbox" onChange={e => this.onChange(e, each.text)} checked={false} />
                  <span className={styles.text}>{each.text}</span>
                </label>
              )
              }
          </span>
        ))}
      </div>
    );
  }
}

ButtonFilter.propTypes = {
  reviews: PropTypes.arrayOf,
  starRatingButton: PropTypes.string.isRequired,
  handleSortedReviews: PropTypes.func.isRequired,
  sortOption: PropTypes.string.isRequired,
  stars: PropTypes.string,
  handleRatingButton: PropTypes.func.isRequired,
};

ButtonFilter.defaultProps = {
  reviews: undefined,
  stars: null,
};

export default ButtonFilter;
