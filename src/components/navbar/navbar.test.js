import Navbar from './navbar'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><Navbar /></MemoryRouter>, div)
});