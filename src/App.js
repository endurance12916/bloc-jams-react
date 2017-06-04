import React, { Component } from 'react';
import Navbar from './components/navbar/navbar.js';
// import Home from './components/home/home.js'
// import { BrowserRouter as Router, Link } from 'react-router-dom'

class App extends Component {
  // constructor(){
  //   super();
  // }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

/*class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAlbum: 0
    };
    
    this.onChangeCurrentAlbum = this.changeCurrentAlbum.bind(this);
  }
  
  changeCurrentAlbum() {
    this.setState({ currentAlbum: this.state.currentAlbum + 1 });
  }
  
  render() {
    return (
      <div>
        <h1>App</h1>
       
        <HomeRoute
          onButtonClicked={this.onChangeCurrentAlbum}
          currentAlbum={this.state.currentAlbum}
          path=""
        />
        <Route path="/about" component={About} />
      </div>
    )
  }
}*/

export default App;