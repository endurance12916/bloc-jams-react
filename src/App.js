import React, { Component } from 'react';
import Navbar from './components/navbar/navbar.js';
// import Home from './components/home/home.js'
// import { BrowserRouter as Router, Link } from 'react-router-dom'
// import cover from './assets/images/album_covers/01.png';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      /*currentAlbum: (
            <div className="collection-album-container column fourth">
            <img src={cover} alt="cover"/>
            <div className="collection-album-info caption">
                <p>
                <Link to="/album" className="album-name"> The Colors </Link>
                <br/>
                <Link to="/album"> Pablo Picasso </Link>
                <br/>
                X songs
                <br/>
                </p>
            </div>
            </div>
            )*/
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