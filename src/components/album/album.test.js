import Album from './album';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';

it('renders without crashes', () => {
    shallow(<Album />)
});

it('renders songs when mounted', () => {
  const wrapper = mount(<Album />);
  expect(wrapper.find('td.song-item-number').length).toEqual(5);
})

// error: expect(jest.fn()).toHaveBeenCalled() - is there a way to simulate click in order to test mouseClick()?
// it('plays song after click', () => {
//   const wrapper = mount(<Album />);
//   wrapper.mouseClick = jest.fn();
//   // used wrapper.find() because cannot use instance.find() - error message: "instance.find is not a function"
//   wrapper.find('td.song-item-number').first().simulate('click');
//   expect(wrapper.mouseClick).toHaveBeenCalled();
// })

it('sets song after mouse click', () => {
  const wrapper = mount(<Album />);
  const inst = wrapper.instance();
  inst.setSong = jest.fn();
  inst.mouseClick();
  expect(inst.setSong).toHaveBeenCalled();
})

it ('stops song before unmount', () => {
  const wrapper = mount(<Album />);
  const inst = wrapper.instance();
  inst.state.currentSoundFile.stop = jest.fn(); //TypeError: this.props.currentSoundFile.unbind is not a function
  wrapper.unmount();
  expect(inst.state.currentSoundFile.stop).toHaveBeenCalled();
})