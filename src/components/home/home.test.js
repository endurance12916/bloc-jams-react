import Home from './home'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Home />)
});

