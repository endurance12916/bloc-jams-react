import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
});

it('renders a snapshot', () => {
    const wrapper = renderer.create(<MemoryRouter><App/></MemoryRouter>).toJSON();
    expect(wrapper).toMatchSnapshot();
});