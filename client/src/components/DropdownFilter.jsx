import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/dropdownfilter.css';

class DropdownFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false,
      wordShown: '',
    };
    this.mouseClick = this.mouseClick.bind(this);
    this.clickSort = this.clickSort.bind(this);
  }

  mouseClick() {
    this.setState(state => ({ dropdown: !state.dropdown }));
  }

  clickSort(word) {
    this.setState({ wordShown: word });
    this.props.handleSortedReviews(word, undefined, this.props.stars);
    this.setState(state => ({ dropdown: !state.dropdown }));
  }

  render() {
    const { dropdown, wordShown } = this.state;

    return (
      <div className={styles.form}>
        <div className={styles.formselect} onClick={this.mouseClick}>
          <span className={styles.selected}>{wordShown}</span>
        </div>
        {dropdown
          ? (
            <div className={styles.optionwrapper}>

              <div className={styles.option} onClick={() => this.clickSort('Newest')}>
                <input type="radio" />
                &nbsp;Newest
              </div>

              <div className={styles.option} onClick={() => this.clickSort('Highest Rating')}>
                <input type="radio" />
                &nbsp;Highest Rating
              </div>

              <div className={styles.option} onClick={() => this.clickSort('Lowest Rating')}>
                <input type="radio" />
                 &nbsp;Lowest Rating
              </div>
            </div>
          )
          : null}

      </div>
    );
  }
}

DropdownFilter.propTypes = {
  stars: PropTypes.string,
  handleSortedReviews: PropTypes.func,
};

DropdownFilter.defaultProps = {
  stars: null,
};

export default DropdownFilter;
