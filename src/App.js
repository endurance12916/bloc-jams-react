import React, { Component } from 'react';
import Navbar from './components/navbar.js'
import Landing from './components/landing.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar/>
          <section className="hero-content"> 
              <h1 className="hero-title">Turn the music up!</h1>
          </section>
          <section className="selling-points container clearfix">
              <div className="point column third">
                  <span className="ion-music-note"></span>
                  <h5 className="point-title">Choose your music</h5>
                  <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
              </div>
              <div className="point column third">
                  <span className="ion-radio-waves"></span>
                  <h5 className="point-title">Unlimited, streaming, ad-free</h5>
                  <p className="point-description">No arbitrary limits. No distractions.</p>
              </div>
              <div className="point column third">
                  <span className="ion-iphone"></span>
                  <h5 className="point-title">Mobile enabled</h5>
                  <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
              </div>
          </section>
      </div>
    );
  }
}

export default App;
