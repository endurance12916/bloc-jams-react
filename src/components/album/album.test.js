import Album from './album';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

it('renders without crashes', () => {
    shallow(<Album />)
});