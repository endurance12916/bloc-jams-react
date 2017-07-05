import React, { Component } from 'react';
import './player_bar.css';
import exampleAlbum from '../fixtures/fixtures.js';
import buzz from 'buzz';
import _ from 'lodash'; 

class PlayerBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentTime:"0:00",
            totalTime:"0:00"
        }
    }

    timeUpdate = (sound) => {
        if (sound!==null) {
            // is _this=this the best way to make sure the scope is correct for callback functions?
            let _this = this;
            sound.bind("timeupdate", function() {
                let timer = buzz.toTimer(this.getTime());
                let ratio = sound.getTime() / sound.getDuration();
                let position = _this.timeline.offsetWidth * ratio;
                _this.positionThumb(position);

                // is this the best way? constantly changing states, would this eat a lot of cpu/memory?
                _this.setState({currentTime:_this.setCurrentTimeInPlayerBar(sound.getTime())})
                _this.setState({totalTime:_this.setTotalTimeInPlayerBar(sound.getDuration())})
            });
        }
    }

    playerBarClick = (event) => {
        this.props.clickButtonChangeState(this.props.currentSongObject)
    }

    playerBarPlayButtonContent() {
        if (_.isEmpty(this.props.currentSoundFile)) {
            return (<span className="ion-play"></span>)
        } else if (this.props.currentSoundFile.isPaused()){
            return (<span className="ion-play"></span>)
        } else {
            return (<span className="ion-pause"></span>)
        }
    }

    nextSong() {
        let nextSongIndex = this.props.currentSongObject.number-1+1;
        nextSongIndex > 4
            ? nextSongIndex = nextSongIndex - 5
            : nextSongIndex
        let newSong = exampleAlbum[nextSongIndex];
        this.props.nextSong(newSong);
    }

    previousSong() {
        let previousSongIndex = this.props.currentSongObject.number-1-1;
        previousSongIndex < 0
            ? previousSongIndex = previousSongIndex + 5
            : previousSongIndex
        let newSong = exampleAlbum[previousSongIndex];
        this.props.previousSong(newSong);
    }

    // timeline bar functions
    setCurrentTimeInPlayerBar(currentTime) {
        return this.props.filterTimeCode(parseInt(currentTime));
    }

    setTotalTimeInPlayerBar(totalTime) {
        return this.props.filterTimeCode(parseInt(totalTime));
    }

    // mouse functions for the timeline
    mouseDown = (e) => {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    mouseUp = (e) => {
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseMove = (e) => {
        this.positionThumb(e.pageX-this.container.offsetLeft);
        let sound = this.props.currentSoundFile;
        sound.setTime(((e.pageX-this.container.offsetLeft) / this.timeline.offsetWidth) * sound.getDuration())
    };

    positionThumb = (position) => {
        let timelineWidth = this.timeline.offsetWidth - this.thumb.offsetWidth;
        let thumbLeft = position - this.timeline.offsetLeft;
        if (thumbLeft >= 0 && thumbLeft <= timelineWidth) {
            this.thumb.style.left = thumbLeft + "px";
            this.fill.style.width = this.thumb.style.left;
        }
        if (thumbLeft < 0) {
            this.thumb.style.left = "0px";
            this.fill.style.width = this.thumb.style.left;
        }
        if (thumbLeft > timelineWidth) {
            this.thumb.style.left = timelineWidth + "px";
            this.fill.style.width = this.thumb.style.left;
        }
    };

    // mouse functions for the volume
    mouseDownVol = (e) => {
        window.addEventListener('mousemove', this.mouseMoveVol);
        window.addEventListener('mouseup', this.mouseUpVol);
    };

    mouseUpVol = (e) => {
        window.removeEventListener('mousemove', this.mouseMoveVol);
        window.removeEventListener('mouseup', this.mouseUpVol);
    };

    mouseMoveVol = (e) => {
        this.positionThumbVol(e.pageX);
        let sound = this.props.currentSoundFile;
        let offsetX = e.pageX - this.volBar.offsetLeft;
        let vol = offsetX/this.volBar.offsetWidth * 100;
        if (vol>100) {vol = 100} else if (vol<0) {vol = 0}
        this.props.setVolume(sound, vol)
        this.setState({currentVolume:vol})
    };

    positionThumbVol = (position) => {
        let thumbVolLeft = position - this.volBar.offsetLeft;
        let volBarWidth = this.volBar.offsetWidth;
        if (thumbVolLeft >= 0 && thumbVolLeft <= volBarWidth) {
            this.thumbVol.style.left = thumbVolLeft + "px";
            this.fillVol.style.width = this.thumbVol.style.left;
        }
        if (thumbVolLeft < 0) {
            this.thumbVol.style.left = + "0px";
            this.fillVol.style.width = this.thumbVol.style.left;
        }
        if (thumbVolLeft > volBarWidth) {
            this.thumbVol.style.left = volBarWidth + "px";
            this.fillVol.style.width = this.thumbVol.style.left;
        }
    };

    componentWillUpdate = (newProps, newState) => {
        if (newProps.currentSoundFile && newProps.currentSoundFile !== this.props.currentSoundFile) {
            this.timeUpdate(newProps.currentSoundFile);
        }
    }
    
    componentWillUnmount() {
        this.props.currentSoundFile.unbind('timeupdate', this.timeUpdate);
    }

    render() {
        return (
            <section className="player-bar">
                <div className="container">
                    <div className="control-group main-controls">
                        <a className="previous" onMouseUp={this.previousSong.bind(this)}>
                            <span className="ion-skip-backward"></span>
                        </a>
                        <a className="play-pause" onMouseUp={this.playerBarClick.bind(this)}>
                            {this.playerBarPlayButtonContent()}
                        </a>
                        <a className="next" onMouseUp={this.nextSong.bind(this)}>
                            <span className="ion-skip-forward"></span>
                        </a>
                    </div>
                    <div className="control-group currently-playing" ref={(container) => { this.container = container }}>
                        <h2 className="song-name">{this.props.currentSongObject.title}</h2>
                        <div className="seek-control">
                            <div className="seek-bar" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }} >
                                <div className="fill" ref={(fill) => { this.fill = fill }}></div>
                                <div className="thumb" onMouseDown={this.mouseDown} ref={(thumb) => { this.thumb = thumb }} ></div>
                            </div>
                            <div className="current-time">{this.state.currentTime}</div>
                            <div className="total-time">{this.state.totalTime}</div>
                        </div>
                        <h2 className="artist-song-mobile"></h2>
                        <h3 className="artist-name"></h3>
                    </div>
                    <div className="control-group volume" ref={(containerVol) => { this.containerVol = containerVol }}>
                        <span className="ion-volume-high icon"></span>
                        <div className="seek-bar" onClick={this.mouseMoveVol} ref={(volBar) => { this.volBar = volBar }}>
                            <div className="fill" ref={(fillVol) => { this.fillVol = fillVol }} ></div>
                            <div className="thumbVol" onMouseDown={this.mouseDownVol} ref={(thumbVol) => { this.thumbVol = thumbVol }} ></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default PlayerBar;