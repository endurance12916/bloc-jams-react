import React, { Component } from 'react';
import Navbar from './components/navbar.js'
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

  componentDidMount() {
      let pointsArray = document.getElementsByClassName('point');

      let animatePoints = function (points) {

          let revealFirstPoint = function () {
              points[0].style.opacity = 1;
              points[0].style.transform = "scaleX(1) translateY(0)";
              points[0].style.msTransform = "scaleX(1) translateY(0)";
              points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
          };

          let revealSecondPoint = function () {
              points[1].style.opacity = 1;
              points[1].style.transform = "scaleX(1) translateY(0)";
              points[1].style.msTransform = "scaleX(1) translateY(0)";
              points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
          };

          let revealThirdPoint = function () {
              points[2].style.opacity = 1;
              points[2].style.transform = "scaleX(1) translateY(0)";
              points[2].style.msTransform = "scaleX(1) translateY(0)";
              points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
          };

          revealFirstPoint();
          revealSecondPoint();
          revealThirdPoint();

      };

      let sellingPoints = document.getElementsByClassName('selling-points')[0];
      let scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

      window.addEventListener("scroll", function (event) {
          // Automatically animate the points on a tall screen where scrolling can't trigger the animation
          if (window.innerHeight > 950) {
              animatePoints(pointsArray);
          }
          //  console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
          if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
              animatePoints(pointsArray);
          }
      });
  }
  }

export default App;



