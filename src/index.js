import React from 'react';
import ReactDOM from 'react-dom';
import buzz from 'buzz';
import App from './App.js';
import Home from './components/home/home.js'
import Collection from './components/collection/collection.js'
import Album from './components/album/album.js'
import PlayerBar from './components/album/player_bar.js'

import { BrowserRouter, Route } from 'react-router-dom'

// Code below doesn't work, why?
// change to class Root
/*const Root = () => { <-- stateless react component, if need state, need to have class
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
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/album" component={()=>(<div><Album/><PlayerBar/></div>)} />
      </App>
    </BrowserRouter>
), document.getElementById('root'));

        //   <Route path ="" render={props => (
        //   <PlayerBar
        //     currentSongNumber={this.state.currentSongNumber}
        //     songBeingPlayed={this.state.songBeingPlayed}
        //     songBeingPaused={this.state.songBeingPaused}
        //     {...props}
        //   />
        // )}
        // />