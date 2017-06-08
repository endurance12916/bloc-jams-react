import React, { Component } from 'react';
import './album.css';
import cover from '../../assets/images/album_covers/01.png';

const exampleAlbum = [
    { number: 1, title: 'Blue', duration: '4:26' },
    { number: 2, title: 'Green', duration: '3:14' },
    { number: 3, title: 'Red', duration: '5:01' },
    { number: 4, title: 'Pink', duration: '3:21' },
    { number: 5, title: 'Magenta', duration: '2:15' }
]

class Album extends Component {
    constructor(){
        super();

        this.state = {
            currentSongNumber: {},
            songBeingPlayed: {},
            songBeingPaused: {}
        }
    }

    populateSongs() {
        // is it better to put const example album here or to above?
        return(
            exampleAlbum.map((song,i)=>{
                return(
                    <tr className="album-view-song-item" key={i} onMouseEnter={this.mouseEnter.bind(this,song)} onMouseLeave={this.mouseLeave}>
                        <td className="song-item-number" data-song-number={song.number} onMouseDown={this.mouseClick}>{this.songNumberCellContent(song)}</td>
                        <td className="song-item-title">{song.title}</td>
                        <td className="song-item-duration">{song.duration}</td>
                    </tr>
                )
            })
        )
    }

    songNumberCellContent(song) {
        if (song.number === parseInt(this.state.songBeingPlayed,0)){
            return (<a className="album-song-button"><span className="ion-pause"></span></a>)
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
        this.setState({currentSongNumber:{}})
    };

    mouseClick = (event) => {
        // starting status: no song played, no song paused (songBeingPlayed: {}, songBeingPaused: {}):
        // if click on a song -> play that song

        // if a song is currently being played (songBeingPlayed: {n}, songBeingPaused: {}):
        // if click on the song being played, paused it; otherwise play the current song && stop the previous song and reverse the cell back to number

        // if a song is currently being paused (songBeingPlayed: {}, songBeingPaused: {n})
        // if click on the song being paused, resume it; otherwise play the current song && reverse the previous song's cell back to number

        this.state.currentSongNumber === this.state.songBeingPlayed
            ? (this.setState({songBeingPaused: this.state.currentSongNumber, songBeingPlayed:{}}))
            : this.setState({songBeingPlayed: this.state.currentSongNumber, songBeingPaused: {}});
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

                <section className="player-bar">
                    <div className="container">
                        <div className="control-group main-controls">
                            <a className="previous">
                                <span className="ion-skip-backward"></span>
                            </a>
                            <a className="play-pause">
                                <span className="ion-play"></span>
                            </a>
                            <a className="next">
                                <span className="ion-skip-forward"></span>
                            </a>
                        </div>
                        <div className="control-group currently-playing">
                            <h2 className="song-name"></h2>
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