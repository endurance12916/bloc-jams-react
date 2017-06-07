import React from 'react';
import {
  // BrowserRouter as Router,
  // Route,
  Link
} from 'react-router-dom';
import logo from '../../assets/images/bloc_jams_logo.png';
import './navbar.css';

const Navbar = () => (
  <nav className="navbar"> 
    <Link to="/" className="logo">
      <img src={logo} alt="bloc jams logo" />
    </Link>
    <div className="links-container">
      <Link to="/collection" className="navbar-link">collection</Link>
    </div>
  </nav>
)

export default Navbar;