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

//Wrong:
// it('renders default text', () => {
//   const wrapper = mount(<Home />)
//   const expectedNode = shallow(<DefaultText />)
//   expect((wrapper).contains(expectedNode)).toEqual(true);
// })

it('renders default text', () => {
  const home = shallow(<Home/>);
  expect((home).contains(<DefaultText />)).toEqual(true);
});

//Wrong:
// it('renders additional texts after scrolling', () => {
//   const scrolling = mount(<Home />).simulate('scroll');
//   expect(scrolling.contains(ScrollText)).toEqual(true);
// })

//Works but not desired
// it('renders additional texts after scrolling', () => {
//   const scrolling = shallow(<Home />).simulate('scroll');
//   expect(scrolling.contains(<ScrollText/>)).toEqual(true);
// })

it('renders additional texts after scrolling', () => {
  const scrollText = mount(<ScrollText />);
  const instance = scrollText.instance();
  instance.animatePoints = jest.fn();
  instance.scrollDown();
  expect(instance.animatePoints).toHaveBeenCalled();
})