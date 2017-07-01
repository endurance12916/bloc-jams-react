import PlayerBar from './player_bar'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

it('renders without crashes', () => {
    // seems like it needs a prop, but is this the right way?
    shallow(<PlayerBar currentSongObject={ '' }/>)
});