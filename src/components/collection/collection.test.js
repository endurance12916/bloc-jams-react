import Collection from './collection'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

it('renders without crashing',() => {
    shallow(<Collection />)
});