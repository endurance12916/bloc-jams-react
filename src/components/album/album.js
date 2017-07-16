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
            currentSongObject: {},
            currentSongNumber: {},
            songBeingPlayed: {},
            songBeingPaused: {},
            currentSoundFile: {},
            currentVolume: 80,
        }
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
        this.setState({currentSongNumber: {}})
    };

    mouseClick = (song, event) => {
        this.clickSongChangeState(song);
    }

    clickSongChangeState = (song) => {
        let sound = this.setSong(song);
        if (!_.isEmpty(sound)) {
            sound.isPaused() ?
                (this.setState({
                    songBeingPaused: this.state.currentSongNumber,
                }), sound.play(), this.setState({
                    songBeingPlayed: this.state.currentSongNumber
                })) :
                (sound.pause(), this.setState({
                    songBeingPaused: this.state.currentSongNumber
                }))
        }
    }

    // function below is for the play button in the playerbar section, for the purpose of changing states in parent
    clickButtonChangeState = (song) => {
        let sound = this.setSong(song);
        if (!_.isEmpty(sound)) {
            sound.isPaused() ?
                (this.setState({
                    songBeingPaused: song.number
                }), sound.play(), this.setState({
                    songBeingPlayed: song.number
                })) :
                (sound.pause(), this.setState({
                    songBeingPaused: song.number
                }))
        }
    }

    setSong = (song) => {
        // doesn't work on the first click, why? --> setState doesn't do it immediately. better to pass a return and define a variable in the other functino (let currentSoundFile = this.setSong(song);)

        // if previously playing a different song
        if (!_.isEmpty(this.state.currentSoundFile) && this.state.currentSongObject !== song) {
            // pause the previous song, then set new song
            this.state.currentSoundFile.pause();
            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })
            this.setState({currentSoundFile: sound, currentSongObject: song})
            this.setVolume(sound, this.state.currentVolume)
            return sound

        } else if (this.state.currentSongObject === song) {
            // if same song 
            this.setState({currentSongObject:song})
            return this.state.currentSoundFile

        } else {
            // if first time playing
            const sound = new buzz.sound(song.audioUrl, {
                preload: true
            })
            this.setState({currentSoundFile: sound, currentSongObject: song})
            this.setVolume(sound, this.state.currentVolume)
            return sound
        }
    }

    setVolume = (sound, volume) => {
        if (sound) {
            sound.setVolume(volume);
        }
    }

    // the two functions below will return error if not bind
    nextSong = (newSong) => {
        let nextSongBeingPlayedIndex = this.state.songBeingPlayed+1;
        nextSongBeingPlayedIndex > 5
            ? nextSongBeingPlayedIndex = nextSongBeingPlayedIndex - 5
            : nextSongBeingPlayedIndex       
        this.setState({songBeingPlayed:nextSongBeingPlayedIndex, songBeingPaused:{}});
        let sound = this.setSong(newSong);
        sound.play();
    }

    previousSong = (newSong) => {
        let previousSongBeingPlayedIndex = this.state.songBeingPlayed-1;
        previousSongBeingPlayedIndex < 1
            ? previousSongBeingPlayedIndex = previousSongBeingPlayedIndex + 5
            : previousSongBeingPlayedIndex    
        this.setState({songBeingPlayed:previousSongBeingPlayedIndex, songBeingPaused:{}});
        let sound = this.setSong(newSong);
        sound.play();
    }

    filterTimeCode(timeInSeconds) {
        let minutes = Math.floor(parseFloat(timeInSeconds) / 60);
        let seconds = parseFloat(timeInSeconds) - minutes * 60;
        return seconds < 10 ? (minutes + `:0` + seconds) : (minutes + ':' + seconds);
    }

    componentWillUnmount() {
        this.state.currentSoundFile.stop();
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

                <PlayerBar
                ref={instance => { this.child = instance }}
                currentSongObject={this.state.currentSongObject}
                currentSoundFile={this.state.currentSoundFile}
                currentVolume={this.state.currentVolume}
                clickButtonChangeState={this.clickButtonChangeState}
                mouseClick={this.mouseClick}
                nextSong={this.nextSong}
                previousSong={this.previousSong}
                setVolume={this.setVolume}
                filterTimeCode={this.filterTimeCode}
                />

            </section>
        )
    }
}

export default Album;