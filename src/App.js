import React, { Component } from 'react';
import Navbar from './components/navbar/navbar.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSongNumber: {},
      songBeingPlayed: {},
      songBeingPaused: {}
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;