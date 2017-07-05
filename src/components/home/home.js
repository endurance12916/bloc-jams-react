import React, { Component } from 'react';
import './home.css';

const DefaultText = () => (
    <section className="hero-content"> 
        <h1 className="hero-title">Turn the music up!</h1>
    </section>
)

class ScrollText extends Component {

    animatePoints(points) {
        for (let point of points) {
            point.style.opacity = 1;
            point.style.transform = "scaleX(1) translateY(0)";
            point.style.msTransform = "scaleX(1) translateY(0)";
            point.style.WebkitTransform = "scaleX(1) translateY(0)";
        }
    };

    scrollDown = (event) => {
        // const pointsArray = document.getElementsByClassName('point');
        const pointsArray = [this.pointOne, this.pointTwo, this.pointThree]
        const scrollDistance = this.sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
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

    render(){
        return (
        <section className="selling-points container clearfix" ref={(sellingPoints) => { this.sellingPoints = sellingPoints }} >
            <div className="point column third" ref={(pointOne) => { this.pointOne = pointOne }}>
                <span className="ion-music-note"></span>
                <h5 className="point-title">Choose your music</h5>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
            <div className="point column third" ref={(pointTwo) => { this.pointTwo = pointTwo }}>
                <span className="ion-radio-waves"></span>
                <h5 className="point-title">Unlimited, streaming, ad-free</h5>
                <p className="point-description">No arbitrary limits. No distractions.</p>
            </div>
            <div className="point column third" ref={(pointThree) => { this.pointThree = pointThree }}>
                <span className="ion-iphone"></span>
                <h5 className="point-title">Mobile enabled</h5>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
        </section>
        )
    }
}

const Home = () => {
    return (
        <section className="landing">
            <DefaultText />
            <ScrollText />
        </section>
    );
}


// export default Home;
export { Home, DefaultText, ScrollText }