import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../client/src/components/App';
import Summary from '../client/src/components/Summary';
import Reviews from '../client/src/components/Reviews';
import StarRating from '../client/src/components/StarRating';
import OverallNums from '../client/src/components/OverallNums';
import Noise from '../client/src/components/Noise';
import Recommend from '../client/src/components/Recommend';
import ReviewsChart from '../client/src/components/Recommend';

// const props = {reviews: [{
//   reviewID:1,
//   restaurantID:1,
//   userName:'janicelam',
//   userLocation:'San Francisco',
//   userTotalReviews:5,
//   reviewDate:'2018-08-16',
//   reviewOverallRating:4,
//   reviewFoodRating:4,
//   reviewServiceRating:4,
//   reviewAmbienceRating:4,
//   reviewValueRating:4,
//   reviewHelpfulCount:4,
//   reviewNoise:4,
//   reviewRecommend:true,
//   reviewBody:'hello there',
//   restaurantTotalReviews:10,
//   avgOverallRating:4,
//   avgFoodRating:4,
//   avgServiceRating:4,
//   avgAmbienceRating:4,
//   avgValueRating:4,
//   avgNoiseRating:4,
//   avgRecRating:4,
//   keyWords:'hello,goodbye',
//   neighborhood:'richmond'
// }]}

describe('App Component', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.master')).toBe(true);
  });

  it('renders <Summary />  and <Reviews/> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Summary)).toHaveLength(1);
    expect(wrapper.find(Reviews)).toHaveLength(1);
  })
});

describe('Summary Component', () => {
  const props = {reviews: [{
    restaurantTotalReviews:10,
    neighborhood:'richmond'
  }]}

  const wrapper = shallow(<Summary {...props}/>);

  it('renders <StarRating />, <OverallNums />, <Noise />, <Recommend />, <ReviewsChart /> components', () => {
    expect(wrapper.find(StarRating)).toHaveLength(1)
    expect(wrapper.find(OverallNums)).toHaveLength(1)
    expect(wrapper.find(Noise)).toHaveLength(1)
    expect(wrapper.find(Recommend)).toHaveLength(1)
    expect(wrapper.find(ReviewsChart)).toHaveLength(1)
  });

  it ('renders information from props correctly', () => {
    let targetNode = wrapper.find('.whatpplsay');
    expect(targetNode.text()).toMatch('10')
  });

})

describe('StarRating Component', () => {
  let props = {rating: [{
    avgOverallRating: 3.5,
  }]}
  const wrapper = shallow(<StarRating {...props}/>);

  it('renders numbers of full stars correctly', () => {
    expect(wrapper.find('.fullStyleRed')).toHaveLength(3);
  })

  it('renders numbers of half stars correctly', () => {
    expect(wrapper.find('.halfStyle')).toHaveLength(1);
  })

  it('renders numbers of empty stars correctly', () => {
    expect(wrapper.find('.fullStyleGrey')).toHaveLength(1)
  })

})

describe('OverallNums Component', () => {
  const props = {nums: {
    avgFoodRating: 4,
    avgServiceRating: 3,
    avgAmbienceRating: 2,
    avgValueRating: 1
  }};
  const wrapper = shallow(<OverallNums {...props} />);

  it('renders the correct length', () => {
    expect(wrapper.find('.num')).toHaveLength(4);
    expect(wrapper.find('.num').first().text()).toMatch('4');
  })
})

describe('Noise Component', () => {
  const props = {noiseLevel: {
    avgNoiseRating: 4,
  }};
  const wrapper = shallow(<Noise {...props} />);

  it('renders the correct noise level', () => {
    expect(wrapper.find('#normal').text()).toMatch('Energetic');
  })
})

describe('Recommend Component', () => {
  const props = {recLevel: {
    avgRecRating: 30,
  }}
  const wrapper = shallow(<Recommend {...props} />);
  it('renders the correct icon', () => {

    expect(wrapper.find('.noise').text()).toMatch('30');
  })
})