import React, { Component } from 'react';
import './album.css';
import cover from '../../assets/images/album_covers/01.png';
import exampleAlbum from '../fixtures/fixtures.js';
import buzz from 'buzz';
import PlayerBar from './player_bar.js';
import _ from 'lodash'; 

class Album extends Component {
    constructor(){
        super();

        this.state = {
            currentSongObject:{},
            currentSongNumber: {},
            songBeingPlayed: {},
            songBeingPaused: {},
            currentSoundFile:{},
            currentVolume:80,
            currentTime:"0:00",
            totalTime:"0:00"
        }
    // this.populateSongs = this.populateSongs.bind(this)
    this.setSong = this.setSong.bind(this)
    this.setVolume = this.setVolume.bind(this)
    
    }

    // use arrow function to auto-bind
    populateSongs = () => {
        return(
            exampleAlbum.map((song,i)=>{
                return(
                    <tr className="album-view-song-item" key={i} onMouseEnter={this.mouseEnter.bind(this,song)} onMouseLeave={this.mouseLeave}>
                        <td className="song-item-number" onMouseUp={this.mouseClick.bind(this,song)}>{this.songNumberCellContent(song)}</td>
                        <td className="song-item-title">{song.title}</td>
                        <td className="song-item-duration">{this.filterTimeCode(parseInt(song.duration))}</td>
                    </tr>
                )
            })
        )
    }

    songNumberCellContent(song) {
        if (song.number === parseInt(this.state.songBeingPlayed,0)){
            if (!this.state.currentSoundFile.isPaused()){
                return (<a className="album-song-button"><span className="ion-pause"></span></a>)
            } else {
                return (<a className="album-song-button"><span className="ion-play"></span></a>)
            }
        }
        else if (song.number === parseInt(this.state.currentSongNumber,0)){
            return (<a className="album-song-button"><span className="ion-play"></span></a>)
        } else {
            return song.number
        }
    }

    mouseEnter = (song, event) => {
        this.setState({currentSongNumber: song.number});
    };

    mouseLeave = (event) => {
        this.setState({
            currentSongNumber: {}
        })
    };

    mouseClick = (song, event) => {
        let sound = this.setSong(song);

        sound.isPaused() ?
            (this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }), sound.play(), this.setState({
                songBeingPlayed: this.state.currentSongNumber
            })) :
            (sound.pause(), this.setState({
                songBeingPaused: this.state.currentSongNumber
            }))
    }

    setSong(song) {
        // doesn't work on the first click, why? --> setState doesn't do it immediately. better to pass a return and define a variable in the other functino (let currentSoundFile = this.setSong(song);)

        // if previously playing a different song
        if (!_.isEmpty(this.state.currentSoundFile) && this.state.currentSongObject !== song) {
            // pause the previous song, then set new song
            this.state.currentSoundFile.pause();

            this.setState({
                currentSongObject: song
            })

            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })

            // don't use arrow function here. because "this" will be in parent scope
            let _this = this;
            sound.bind("timeupdate", function() {
                let timer = buzz.toTimer(this.getTime());
                let ratio = sound.getTime() / sound.getDuration();
                let position = _this.timeline.offsetWidth * ratio;
                _this.positionthumb(position);

                // is this the best way? constantly changing states, would this eat a lot of cpu/memory?
                _this.setState({currentTime:_this.setCurrentTimeInPlayerBar(sound.getTime())})
                _this.setState({totalTime:_this.setTotalTimeInPlayerBar(sound.getDuration())})
            });
            
            this.setState({
                currentSoundFile: sound
            })

            console.log("playing different song")

            this.setVolume(sound, this.state.currentVolume)

            return sound
        } else if (this.state.currentSongObject === song) {
            // if same song 
            console.log("playing/pausing same song")
            return this.state.currentSoundFile
        } else {
            // if first time playing
            console.log("first time playing")

            this.setState({
                currentSongObject: song
            })

            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })

            let _this = this;
            sound.bind("timeupdate", function() {
                let timer = buzz.toTimer(this.getTime());
                let ratio = sound.getTime() / sound.getDuration();
                let position = _this.timeline.offsetWidth * ratio;
                _this.positionthumb(position);

                // is this the best way? constantly changing states, would this eat a lot of cpu/memory?
                _this.setState({currentTime:_this.setCurrentTimeInPlayerBar(sound.getTime())})
                _this.setState({totalTime:_this.setTotalTimeInPlayerBar(sound.getDuration())})
            });

            this.setState({
                currentSoundFile: sound
            })

            this.setVolume(sound, this.state.currentVolume)

            return sound
        }
    }

    setVolume(sound, volume) {
        if (sound) {
            sound.setVolume(volume);
        }
    }

    // Below are player_bar functions. To move to player_bar.js when all of them function properly
    playerBarClick = (song, event) => {
        let sound = this.setSong(this.state.currentSongObject)
        
        sound.isPaused() ?
            (this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }), sound.play(), this.setState({
                songBeingPlayed: this.state.currentSongObject.number
            })) :
            (sound.pause(), this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }))
    }

    playerBarPlayButtonContent() {
        if (_.isEmpty(this.state.currentSoundFile)) {
            return (<span className="ion-play"></span>)
        } else if (this.state.currentSoundFile.isPaused()){
            return (<span className="ion-play"></span>)
        } else {
            return (<span className="ion-pause"></span>)
        }
    }

    nextSong() {
        let newSong = this.setSong(exampleAlbum[this.state.currentSongObject.number-1+1]);
        this.setState({songBeingPlayed:this.state.songBeingPlayed+1, songBeingPaused:{}});
        newSong.play();
    }

    previousSong() {
        let newSong = this.setSong(exampleAlbum[this.state.currentSongObject.number-1-1]);
        this.setState({songBeingPlayed:this.state.songBeingPlayed-1, songBeingPaused:{}});
        newSong.play();
    }

    // timeline bar functions
    setCurrentTimeInPlayerBar(currentTime) {
        return this.filterTimeCode(parseInt(currentTime));
    }

    setTotalTimeInPlayerBar(totalTime) {
        return this.filterTimeCode(parseInt(totalTime));
    }

    filterTimeCode(timeInSeconds) {
        let minutes = Math.floor(parseFloat(timeInSeconds) / 60);
        let seconds = parseFloat(timeInSeconds) - minutes * 60;
        return seconds < 10 ? (minutes + `:0` + seconds) : (minutes + ':' + seconds);
    }

    mouseDown = (e) => {
        console.log('mouse down')
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
    };

    mouseUp = (e) => {
        console.log('mouse up')
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseUp);
    };

    mouseMove = (e) => {
        console.log('mouse move')
        // Width of the timeline
        let timelineWidth = this.timeline.offsetWidth - this.thumb.offsetWidth;

        // Left position of the thumb
        let thumbLeft = e.pageX - this.timeline.offsetLeft;

        if (thumbLeft >= 0 && thumbLeft <= timelineWidth) {
            this.thumb.style.marginLeft = thumbLeft + "px";
        }
        if (thumbLeft < 0) {
            this.thumb.style.marginLeft = "0px";
        }
        if (thumbLeft > timelineWidth) {
            this.thumb.style.marginLeft = timelineWidth + "px";
        }
    }

    positionthumb = (position) => {
        let timelineWidth = this.timeline.offsetWidth - this.thumb.offsetWidth;
        let thumbLeft = position - this.timeline.offsetLeft;
        if (thumbLeft >= 0 && thumbLeft <= timelineWidth) {
            this.thumb.style.marginLeft = thumbLeft + "px";
        }
        if (thumbLeft < 0) {
            this.thumb.style.marginLeft = "0px";
        }
        if (thumbLeft > timelineWidth) {
            this.thumb.style.marginLeft = timelineWidth + "px";
        }
        };

        mouseMove = (e) => {
        this.positionthumb(e.pageX);
    };

    render() {
        return (
            <section className="album-page">
                <main className="album-view container narrow">
                    <section className="clearfix">
                        <div className="column half">
                            <img src={cover} alt="cover" className="album-cover-art" />
                        </div>
                        <div className="album-view-details column half">
                            <h2 className="album-view-title">The Colors</h2>
                            <h3 className="album-view-artist">Pablo Picasso</h3>
                            <h5 className="album-view-release-info">1909 Spanish Records</h5>
                        </div>
                    </section>
                    <table className="album-view-song-list">
                        <tbody>    
                            {this.populateSongs()}
                        </tbody>
                    </table>
                </main>

                {/*<PlayerBar
                currentSongObject={this.state.currentSongObject}
                currentSongNumber={this.state.currentSongNumber}
                songBeingPlayed={this.state.songBeingPlayed}
                songBeingPaused={this.state.songBeingPaused}
                
                currentVolume={this.state.currentVolume}
                setSong={this.setSong}
                mouseClick={this.mouseClick}
                nextSong={this.nextSong}
                previousSong={this.previousSong}
                setVolume={this.setVolume}
                />*/}
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
                        <div className="control-group currently-playing">
                            <h2 className="song-name">{this.state.currentSongObject.title}</h2>
                            <div className="seek-control">
                                <div className="seek-bar">
                                    <div className="fill" onClick={this.mouseMove} ref={(timeline) => { this.timeline = timeline }} ></div>
                                    <div className="thumb" onMouseDown={this.mouseDown} ref={(thumb) => { this.thumb = thumb }} >
                                    </div>
                                </div>
                                <div className="current-time">{this.state.currentTime}</div>
                                <div className="total-time">{this.state.totalTime}</div>
                            </div>
                            <h2 className="artist-song-mobile"></h2>
                            <h3 className="artist-name"></h3>
                        </div>
                        <div className="control-group volume">
                            <span className="ion-volume-high icon"></span>
                            <div className="seek-bar">
                                <div className="fill"></div>
                                <div className="thumb"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

export default Album;