import React, { Component } from 'react';
import './player_bar.css';
import exampleAlbum from '../fixtures/fixtures.js';

class PlayerBar extends Component {
    constructor(){
        super();

        this.state = {
            
        }
    }

    render() {
        return (
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
        )
    }
}

export default PlayerBar;