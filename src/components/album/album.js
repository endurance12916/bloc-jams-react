import React, { Component } from 'react';
import Navbar from '../navbar/navbar.js';
import './album.css';
import cover from '../../assets/images/album_covers/01.png';

class Album extends Component {
    constructor(props){
        super(props);
        const exampleAlbum = [
                { number: 1, title: 'Blue', duration: '4:26' },
                { number: 2, title: 'Green', duration: '3:14' },
                { number: 3, title: 'Red', duration: '5:01' },
                { number: 4, title: 'Pink', duration: '3:21'},
                { number: 5, title: 'Magenta', duration: '2:15'}
            ]
        this.state = {
            exampleAlbum
        }
    }

  render() {
    return (
        <section className="album-page">
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
                    <tbody>    
                    {this.state.exampleAlbum.map((song,i)=>{
                        return(
                            <tr className="album-view-song-item" key={i}>
                            <td className="song-item-number">{this.state.exampleAlbum[i].number}</td>
                            <td className="song-item-title">{this.state.exampleAlbum[i].title}</td>
                            <td className="song-item-duration">{this.state.exampleAlbum[i].duration}</td>
                            </tr>
                        )
                      })
                    }
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