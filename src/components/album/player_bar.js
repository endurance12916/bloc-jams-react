// currently putting this in album.js. Will separate after all buttons function

import React, { Component } from 'react';
import './player_bar.css';
import exampleAlbum from '../fixtures/fixtures.js';
import buzz from 'buzz';

class PlayerBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        }
    }
    setVolume(sound, volume) {
        if (sound) {
            sound.setVolume(volume);
        }
    }
    mouseClick(){
        Object.getOwnPropertyNames(this.props.songBeingPlayed).length === 0
        // this.props.songBeingPlayed==={}
        ? this.props.setSong(this.props.songBeingPaused)
        : this.props.setSong(this.props.songBeingPlayed)
    }

    // Below are codes copied from jquery. To update code.
    // updateSeekBarWhileSongPlays() {
    //     if (this.props.currentSoundFile) {
    //         // #10
    //         this.props.currentSoundFile.bind('timeupdate', function (event) {
    //             // #11
    //             let seekBarFillRatio = this.getTime() / this.getDuration();
    //             let $seekBar = $('.seek-control .seek-bar');

    //             updateSeekPercentage($seekBar, seekBarFillRatio);
    //             setCurrentTimeInPlayerBar(this.getTime());
    //         });
    //     }
    // };

    // updateSeekPercentage($seekBar, seekBarFillRatio) {
    //     let offsetXPercent = seekBarFillRatio * 100;
    //     // #1
    //     offsetXPercent = Math.max(0, offsetXPercent);
    //     offsetXPercent = Math.min(100, offsetXPercent);

    //     // #2
    //     let percentageString = offsetXPercent + '%';
    //     $seekBar.find('.fill').width(percentageString);
    //     $seekBar.find('.thumb').css({
    //         left: percentageString
    //     });
    // };

    // setupSeekBars() {
    //     // #6
    //     let $seekBars = $('.player-bar .seek-bar');

    //     $seekBars.click(function (event) {
    //         let offsetX = event.pageX - $(this).offset().left;
    //         let barWidth = $(this).width();
    //         let seekBarFillRatio = offsetX / barWidth;

    //         if ($(this).parent().attr('class') == 'seek-control') {
    //             seek(seekBarFillRatio * this.props.currentSoundFile.getDuration());
    //         } else {
    //             setVolume(seekBarFillRatio * 100);
    //         }

    //         updateSeekPercentage($(this), seekBarFillRatio);
    //     });

    //     $seekBars.find('.thumb').mousedown(function (event) {

    //         let $seekBar = $(this).parent();

    //         $(document).bind('mousemove.thumb', function (event) {
    //             let offsetX = event.pageX - $seekBar.offset().left;
    //             let barWidth = $seekBar.width();
    //             let seekBarFillRatio = offsetX / barWidth;

    //             if ($seekBar.parent().attr('class') == 'seek-control') {
    //                 seek(seekBarFillRatio * this.props.currentSoundFile.getDuration());
    //             } else {
    //                 setVolume(seekBarFillRatio);
    //             }

    //             updateSeekPercentage($seekBar, seekBarFillRatio);
    //         });

    //         // #10
    //         $(document).bind('mouseup.thumb', function () {
    //             $(document).unbind('mousemove.thumb');
    //             $(document).unbind('mouseup.thumb');
    //         });
    //     });
    // };

    render() {
        return (
            <section className="player-bar">
                <div className="container">
                    <div className="control-group main-controls">
                        <a className="previous">
                            <span className="ion-skip-backward"></span>
                        </a>
                        <a className="play-pause" onMouseUp={this.mouseClick.bind(this)}>
                            <span className="ion-play"></span>
                        </a>
                        <a className="next">
                            <span className="ion-skip-forward"></span>
                        </a>
                    </div>
                    <div className="control-group currently-playing">
                        <h2 className="song-name">{this.props.currentSongObject.title}</h2>
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