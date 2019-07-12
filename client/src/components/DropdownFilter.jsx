import React from 'react';
import styles from './style/dropdownfilter.css';

class DropdownFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bordercolor: styles.formselect,
      dropdown: false,
      newest: styles.option,
      highestrating: styles.option,
      lowestrating: styles.option,
      wordShown: '',
    };
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.mouseClick = this.mouseClick.bind(this);
    this.mouseEnterOption = this.mouseEnterOption.bind(this);
    this.clickSort = this.clickSort.bind(this);
  }

  mouseEnter() {
    this.setState({ bordercolor: styles.formselect2 });
  }

  mouseOut() {
    this.setState({ bordercolor: styles.formselect });
  }

  mouseClick() {
    this.setState(state => ({ dropdown: !state.dropdown }));
  }

  mouseEnterOption(opt) {
    this.setState({ [opt]: styles.option2 });
  }

  mouseOutOption(opt) {
    this.setState({ [opt]: styles.option });
  }

  clickSort(word) {
    this.setState({ wordShown: word })
    this.props.handleSortedReviews(word, undefined, this.props.stars)
    this.setState(state => ({ dropdown: !state.dropdown }));
  }

  render() {
    const {
      newest,
      highestrating,
      lowestrating,
      bordercolor,
      dropdown,
      wordShown,
    } = this.state;

    const {
      mouseEnter,
      mouseOut,
      mouseClick,
    } = this;

    return (
      <div className={styles.form}>
        <div className={bordercolor} onMouseEnter={mouseEnter} onMouseOut={mouseOut} onClick={mouseClick} >
          <span className={styles.selected}>{wordShown}</span>
        </div>
        {{ dropdown }.dropdown
          ? (
            <div className={styles.optionwrapper}>

              <div className={newest} onMouseEnter={() => this.mouseEnterOption('Newest')} onMouseOut={() => this.mouseOutOption('Newest')} onClick = {() => this.clickSort('Newest')}>
                <input type="radio" />
                &nbsp;Newest
              </div>

              <div className={highestrating} onMouseEnter={() => this.mouseEnterOption('Highest Rating')} onMouseOut={() => this.mouseOutOption('Highest Rating')} onClick = {() => this.clickSort('Highest Rating')}>
                <input type="radio" />
                &nbsp;Highest Rating
              </div>

              <div className={lowestrating} onMouseEnter={() => this.mouseEnterOption('Lowest Rating')} onMouseOut={() => this.mouseOutOption('Lowest Rating')} onClick = {() => this.clickSort('Lowest Rating')}>
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

export default DropdownFilter;
