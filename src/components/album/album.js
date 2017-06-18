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
        if (!(Object.getOwnPropertyNames(this.state.currentSoundFile).length === 0) && this.state.currentSongObject !== song) {
            // pause the previous song, then set new song
            this.state.currentSoundFile.pause();

            this.setState({
                currentSongObject: song
            })

            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })

            this.setState({
                currentSoundFile: sound
            })

            console.log("playing different song")
            console.log(this.state.songBeingPlayed)
            console.log(this.state.songBeingPaused)

            this.setVolume(sound, this.state.currentVolume)

            return sound
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

            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })

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
    }

    previousSong() {
        let newSong = this.setSong(exampleAlbum[this.state.currentSongObject.number-1-1]);
        this.setState({songBeingPlayed:this.state.songBeingPlayed-1, songBeingPaused:{}});
        newSong.play();
    }

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
                                    <div className="fill"></div>
                                    <div className="thumb"></div>
                                </div>
                                <div className="current-time">2:30</div>
                                <div className="total-time">4:45</div>
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