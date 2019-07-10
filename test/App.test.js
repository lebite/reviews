import React from 'react';
import render from 'react-test-renderer';

import App from '../client/src/components/App';

describe('App component', () => {
  it('renders reviews summary and individual reviews sections', () => {
    const component = render.create(<App />);
    const json = component.toJSON();
    expect(json.children[0].children).toHaveLength(2);
    expect(json).toMatchSnapshot();
  });
});