import React, { Component } from 'react';
// import Navbar from '../navbar/navbar.js';
import './home.css';
/*
class HomeRoute extends Component {
  render() {
    const { currentAlbum, onButtonClicked, ...rest } = this.props;
    
    return (
      <Route {...rest} render={props => (
        <Home
          currentAlbum={currentAlbum}
          onButtonClicked={onButtonClicked}
          {...props}
        />
      )}
      />
    )
  }
}*/

class Home extends Component {

    animatePoints(points) {
        for (let point of points) {
            point.style.opacity = 1;
            point.style.transform = "scaleX(1) translateY(0)";
            point.style.msTransform = "scaleX(1) translateY(0)";
            point.style.WebkitTransform = "scaleX(1) translateY(0)";
        }
    };

    scrollDown = (event) => {
        const pointsArray = document.getElementsByClassName('point');
        const sellingPoints = document.getElementsByClassName('selling-points')[0];
        const scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
        // Automatically animate the points on a tall screen where scrolling can't trigger the animation
        if (window.innerHeight > 950) {
            this.animatePoints(pointsArray);
        }
        //  console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            this.animatePoints(pointsArray);
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.scrollDown);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollDown)
    }

    render() {
        return (
        <section className="landing">
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
        </section>
        );
    }
}

export default Home;