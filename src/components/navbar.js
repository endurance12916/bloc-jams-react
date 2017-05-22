import React, { Component } from 'react';
import {
  // BrowserRouter as Router,
  // Route,
  Link
} from 'react-router-dom';
import logo from '../assets/images/bloc_jams_logo.png';
import '../styles/navbar.css';

/*class Navbar extends Component {
  render() {
    return (
        <nav className="navbar"> 
         <a href="index.html" className="logo">
             <img src={logo} alt="bloc jams logo" />
         </a>
         <div className="links-container">
             <a href="collection.html" className="navbar-link">collection</a>
         </div>
        </nav>
    );
  }
}*/

class Navbar extends Component {
  render() {
    return (
        <nav className="navbar"> 
          <Link to="/home" className="logo">
            <img src={logo} alt="bloc jams logo" />
          </Link>
          <div className="links-container">
            <Link to="/collection" className="navbar-link">collection</Link>
          </div>
        </nav>
    );
  }
}

export default Navbar;