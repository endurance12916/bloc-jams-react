import React, { Component } from 'react';
import Navbar from './navbar.js';
import '../styles/home.css';
import '../styles/album.css';
import cover from '../assets/images/album_covers/01.png';

class Album extends Component {
  render() {
    return (
        <div className="album-page">
            <Navbar />
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
        </div>
    )
  }
}

export default Album;