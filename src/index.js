import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Home from './components/home/home.js'
import Collection from './components/collection/collection.js'
import Album from './components/album/album.js'

// import Navbar from './components/navbar.js'

// original code from create-react-app:
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

import { BrowserRouter, Route } from 'react-router-dom'

// Code below doesn't work, why?
/*const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={App} />
        <Match pattern="/home" component={Home} />
        <Match pattern="/collection" component={Collection} />
        <Miss component={NoMatch} />
      </div>
    </BrowserRouter>
  )
}*/

ReactDOM.render((
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/album" component={Album} />
      </div>
    </BrowserRouter>
), document.getElementById('root'));