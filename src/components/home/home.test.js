import { Home, DefaultText, ScrollText } from './home'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  mount(<Home />)
});

it('renders a snapshot', () => {
    const wrapper = renderer.create(<Home />).toJSON();
    expect(wrapper).toMatchSnapshot();
});

// Why does this one return error, even though the first test (renders without crashing) passes?
it('renders default text', () => {
  const wrapper = mount(<Home />)
  const expectedNode = shallow(<DefaultText />)
  expect((wrapper).contains(expectedNode)).toEqual(true);
})

// This test doesn't work...How to test a scrolling event?
it('renders additional texts after scrolling', () => {
  const scrolling = mount(<Home />).simulate('scroll');
  expect(scrolling.contains(ScrollText)).toEqual(true);
})