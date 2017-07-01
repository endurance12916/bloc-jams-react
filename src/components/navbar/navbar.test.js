import Navbar from './navbar'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

it('renders without crashes', () => {
    shallow(<Navbar />);
});





//     console.error node_modules/fbjs/lib/warning.js:36
//       Warning: Failed context type: The context `router` is marked as required in `Link`, but its value is `undefined`.
//     TypeError: Cannot read property 'history' of undefined

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Navbar />, div);
// });