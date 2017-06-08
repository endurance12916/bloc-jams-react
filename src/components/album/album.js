import React, { Component } from 'react';
// import Navbar from '../navbar/navbar.js';
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
            currentSongNumber: {}
        }
    }

    populateSongs() {
        // is it better to put const example album here or to above?
        return(
            exampleAlbum.map((song,i)=>{
                const songNumberCellContent = song.number === parseInt(this.state.currentSongNumber,0)
                    ? (<a className="album-song-button"><span className="ion-play"></span></a>)
                    : song.number;
                return(
                    <tr className="album-view-song-item" key={i} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                        <td className="song-item-number" data-song-number={song.number}>{songNumberCellContent}</td>
                        <td className="song-item-title">{song.title}</td>
                        <td className="song-item-duration">{song.duration}</td>
                    </tr>
                )
            })
        )
    }

    mouseEnter = (event) => {
        let songNumberCell = event.target.parentNode.querySelector('.song-item-number');

        if (event.target.parentNode.className === 'album-view-song-item') {
            this.setState({currentSongNumber: songNumberCell.getAttribute('data-song-number')});
         }
    };

    mouseLeave = (event) => {
        this.setState({currentSongNumber:{}})
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