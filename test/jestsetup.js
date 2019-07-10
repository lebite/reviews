
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });


global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
