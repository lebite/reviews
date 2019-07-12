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
      firstButtonStyle: [styles.label, styles.text],
      secondButtonStyle: [styles.label, styles.text],
      thirdButtonStyle: [styles.label, styles.text],
      fourthButtonStyle: [styles.label, styles.text],
      fifthButtonStyle: [styles.label, styles.text],
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeStarRating = this.onChangeStarRating.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
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

  mouseOver(styleName) {
    this.setState({ [styleName]: [styles.labelred, this.state[styleName][1]] });
  }

  mouseLeave(styleName) {
    this.setState({ [styleName]: [styles.label, this.state[styleName][1]] });
  }

  mouseOverText(styleName) {
    this.setState({ [styleName]: [this.state[styleName][0], styles.textred] });
  }

  mouseLeaveText(styleName) {
    this.setState({ [styleName]: [this.state[styleName][0], styles.text] });
  }

  render() {
    const { reviews, starRatingButton } = this.props;

    let wordArr = '';
    if ({ reviews }.reviews.length > 0) {
      wordArr = { reviews }.reviews[0].keyWords.split(',');
    }

    const arr = [{ name: 'firstButton', style: 'firstButtonStyle', text: 'Good for groups' }, { name: 'secondButton', style: 'secondButtonStyle', text: wordArr[0] }, { name: 'thirdButton', style: 'thirdButtonStyle', text: wordArr[1] }, { name: 'fourthButton', style: 'fourthButtonStyle', text: wordArr[2] }, { name: 'fifthButton', style: 'fifthButtonStyle', text: wordArr[3] }];

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
                  <span className={this.state[each.style][1]} onMouseEnter={() => this.mouseOverText(each.style)} onMouseLeave={() => {this.mouseLeaveText(each.style)}}>{each.text}</span>
                </label>
              )
              : (
                <label className={this.state[each.style][0]} onMouseOver={() => this.mouseOver(each.style)} onMouseLeave={() => this.mouseLeave(each.style)}>
                  <input name={each.name} className={styles.input} type="checkbox" onChange={e => this.onChange(e, each.text)} checked={false} />
                  <span className={this.state[each.style][1]} onMouseEnter={() => this.mouseOverText(each.style)} onMouseLeave={() => {this.mouseLeaveText(each.style)}}>{each.text}</span>
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
