import React, { Component } from 'react';
import './album.css';
import cover from '../../assets/images/album_covers/01.png';
import exampleAlbum from '../fixtures/fixtures.js';
import buzz from 'buzz';
import PlayerBar from './player_bar.js';

class Album extends Component {
    constructor(){
        super();

        this.state = {
            currentSongObject:{},
            currentSongNumber: {},
            songBeingPlayed: {},
            songBeingPaused: {},
            currentSoundFile:{},
            currentVolume:80
        }
    this.populateSongs = this.populateSongs.bind(this)
    this.setSong = this.setSong.bind(this)
    this.setVolume = this.setVolume.bind(this)
    }

    populateSongs() {
        return(
            exampleAlbum.map((song,i)=>{
                return(
                    <tr className="album-view-song-item" key={i} onMouseEnter={this.mouseEnter.bind(this,song)} onMouseLeave={this.mouseLeave}>
                        <td className="song-item-number" onMouseUp={this.mouseClick.bind(this,song)}>{this.songNumberCellContent(song)}</td>
                        <td className="song-item-title">{song.title}</td>
                        <td className="song-item-duration">{song.duration}</td>
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
        this.audio = this.setSong(song);

        this.audio.isPaused() ?
            (this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }), this.audio.play(), this.setState({
                songBeingPlayed: this.state.currentSongNumber
            })) :
            (this.audio.pause(), this.setState({
                songBeingPaused: this.state.currentSongNumber
            }))

        // this.updateSeekBar(sound);
    }

    setSong(song) {
        // doesn't work on the first click, why? --> setState doesn't do it immediately. better to pass a return and define a variable in the other functino (let currentSoundFile = this.setSong(song);)

        // if previously playing a different song
        if (!(Object.getOwnPropertyNames(this.state.currentSoundFile).length === 0) && this.state.currentSongObject !== song) {
            // pause the previous song, then set new song
            this.state.currentSoundFile.pause();

            this.setState({
                currentSongObject: song
            })

            this.audio = new buzz.sound(song.audioUrl, {
                preload: true
            })

            // don't use arrow function here. because "this" will be in parent scope
            this.audio.bind("timeupdate", function() {
                    var timer = buzz.toTimer(this.getTime());
                    console.log("buzz timer",timer)
                    // console.log(this.audio.currentTime)
                    // console.log(this.audio.duration)

                    // let ratio = this.audio.currentTime / this.audio.duration;
                    // let position = this.timeline.offsetWidth * ratio;
                    // this.positionthumb(position);
                });
            

            this.setState({
                currentSoundFile: this.audio
            })

            console.log("playing different song")
            console.log(this.state.songBeingPlayed)
            console.log(this.state.songBeingPaused)

            this.setVolume(this.audio, this.state.currentVolume)

            console.log(this.audio.getTime());
            console.log(this.audio.getDuration());
            this.setCurrentTimeInPlayerBar(this.audio.getTime());
            this.setTotalTimeInPlayerBar(this.audio.getDuration());

            return this.audio
        }
        // if same song 
        else if (this.state.currentSongObject === song) {
            console.log("playing same song")
            console.log(this.state.songBeingPlayed)
            console.log(this.state.songBeingPaused)
            return this.state.currentSoundFile
        } else {
            console.log("first time playing")
            console.log(this.state.songBeingPlayed)
            console.log(this.state.songBeingPaused)
            // if first time playing
            this.setState({
                currentSongObject: song
            })

            this.audio = new buzz.sound(song.audioUrl, {
                preload: true
            })

            this.setState({
                currentSoundFile: this.audio
            })

            this.setVolume(this.audio, this.state.currentVolume)

            this.setCurrentTimeInPlayerBar(this.audio.getTime());
            this.setTotalTimeInPlayerBar(this.audio.getDuration());

            return this.audio
        }
    }

    setVolume(sound, volume) {
        if (sound) {
            sound.setVolume(volume);
        }
    }

    // Below are player_bar functions. To move to player_bar.js when all of them function properly
    playerBarClick = (song, event) => {
        this.audio = this.setSong(this.state.currentSongObject)
        
        this.audio.isPaused() ?
            (this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }), this.audio.play(), this.setState({
                songBeingPlayed: this.state.currentSongObject.number
            })) :
            (this.audio.pause(), this.setState({
                songBeingPaused: this.state.currentSongObject.number
            }))
        
        // this.updateSeekBar(sound);
    }

    playerBarPlayButtonContent() {
        if ((Object.getOwnPropertyNames(this.state.currentSoundFile).length === 0)) {
            // this.state.currentSoundFile!==undefined && !this.state.currentSoundFile.isPaused()){
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

        // this.updateSeekBar();
    }

    previousSong() {
        let newSong = this.setSong(exampleAlbum[this.state.currentSongObject.number-1-1]);
        this.setState({songBeingPlayed:this.state.songBeingPlayed-1, songBeingPaused:{}});
        newSong.play();

        // this.updateSeekBar();
    }

    // timeline bar
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

    // componentDidMount() {
    //     // if use this.state.currentSoundFile, gives error:this.state.currentSoundFile.addEventListener is not a function
    //     console.log(this.audio)
    //     this.audio.addEventListener("timeupdate", () => {

    //         console.log(this.audio.currentTime)
    //         console.log(this.audio.duration)

    //         let ratio = this.audio.currentTime / this.audio.duration;
    //         let position = this.timeline.offsetWidth * ratio;
    //         this.positionthumb(position);
    //     });
    // };

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

                        <audio ref="audio" src={this.state.currentSoundFile} ref={(audio) => { this.audio = audio } } />

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
                                {/*<div className="current-time">2:30</div>
                                <div className="total-time">4:45</div>*/}
                                <div className="current-time">{this.setCurrentTimeInPlayerBar()}</div>
                                <div className="total-time">{this.setTotalTimeInPlayerBar()}</div>
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