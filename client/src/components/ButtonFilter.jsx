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
    if (buttonName === 'firstButton') {
      this.setState(state => ({ firstButton: !state.firstButton }));
      !this.state.firstButton ? this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars) : this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    } else if (buttonName === 'secondButton') {
      this.setState(state => ({ secondButton: !state.secondButton }));
      !this.state.secondButton ? this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars) : this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    } else if (buttonName === 'thirdButton') {
      this.setState(state => ({ thirdButton: !state.thirdButton }));
      !this.state.thirdButton ? this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars) : this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    } else if (buttonName === 'fourthButton') {
      this.setState(state => ({ fourthButton: !state.fourthButton }));
      !this.state.fourthButton ? this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars) : this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    } else if (buttonName === 'fifthButton') {
      this.setState(state => ({ fifthButton: !state.fifthButton }));
      !this.state.fifthButton ? this.props.handleSortedReviews(this.props.sortOption, keyword, this.props.stars) : this.props.handleSortedReviews(this.props.sortOption, null, this.props.stars);
    }
  }

  onChangeStarRating() {
    this.props.handleRatingButton(null)
  }

  render() {
    let wordArr = '';
    if (this.props.reviews.length > 0) {
      wordArr = this.props.reviews[0].keyWords.split(',');
    }

    const { starRatingButton } = this.props;

    return (
      <div className={styles.container}>
        {{starRatingButton}.starRatingButton
        ?
        <span>
        <label className={styles.label}>
          <input name="starRating" className={styles.input} type="checkbox" checked onChange={this.onChangeStarRating}/>
          <span>{starRatingButton}</span>
        </label>
      </span>
      : null
      }
        <span>
          <label className={styles.label}>
            <input name="firstButton" className={styles.input} type="checkbox" />
            <span>Good for groups</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input name="secondButton" className={styles.input} type="checkbox" onChange={e => this.onChange(e, wordArr[0])} checked={this.state.secondButton} />
            <span>{wordArr[0]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input name="thirdButton" className={styles.input} type="checkbox" onClick={e => this.onChange(e, wordArr[1])} />
            <span>{wordArr[1]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input name="fourthButton" className={styles.input} type="checkbox" onClick={e => this.onChange(e, wordArr[2])} />
            <span>{wordArr[2]}</span>
          </label>
        </span>

        <span>
          <label className={styles.label}>
            <input name="fifthButton" className={styles.input} type="checkbox" onClick={e => this.onChange(e, wordArr[3])} />
            <span>{wordArr[3]}</span>
          </label>
        </span>
      </div>
    )
  }
}

export default ButtonFilter;
