import PlayerBar from './player_bar';
import exampleAlbum from '../fixtures/fixtures.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import buzz from 'buzz';

// describe('<PlayerBar />', () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(<PlayerBar currentSongObject={exampleAlbum[0]} currentSoundFile=''/>);
//   });

it('renders without crashes', () => {
    // seems like it needs a prop, but is this the right way?
    shallow(<PlayerBar currentSongObject={ '' }/>)
});

// error: expect(jest.fn()).toHaveBeenCalled()
it ('calls timeupdate function when component is updated', () => {
    let wrapper = mount(<PlayerBar currentSongObject='' currentSoundFile=''/>);
    const inst = wrapper.instance();
    const sound = new buzz.sound(exampleAlbum[1].audioUrl, {preload: true})
    inst.timeUpdate = jest.fn();
    inst.componentWillUpdate(sound,'');
    // wrapper.setProps({currentSongObject:exampleAlbum[1], currentSongFile: sound});
    // wrapper.update();
    expect(inst.timeUpdate).toHaveBeenCalled();
})

// })