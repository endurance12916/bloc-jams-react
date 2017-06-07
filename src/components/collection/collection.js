import React, { Component } from 'react';
// import Navbar from '../navbar/navbar.js'
import './collection.css';
import cover from '../../assets/images/album_covers/01.png';
import { Link } from 'react-router-dom'

class Collection extends Component {
    constructor(props) {
        super(props);
        // console.log(this);
        const album = (
            <div className="collection-album-container column fourth">
            <img src={cover} alt="cover"/>
            <div className="collection-album-info caption">
                <p>
                <Link to="/album" className="album-name"> The Colors </Link>
                <br/>
                <Link to="/album"> Pablo Picasso </Link>
                <br/>
                X songs
                <br/>
                </p>
            </div>
            </div>
            )
        // const albumArray = [];
        // while (albumArray.length<12) {albumArray.push(album)}

        this.state = {
            // albumArray
            album
        };
        // this.populatePage.bind(this);
    }

  populatePage(){
        const albumArray = [];
        // console.log(this.state.album)
        while (albumArray.length<12) {albumArray.push(this.state.album)};
        return( 
        albumArray.map((album,i)=>{
            return (<div key={i}>{album}</div>);
        }))
  };

  render() {
    return (
      <section className="landing">
        <div className="collection-page">
          <section className="album-covers container clearfix">{this.populatePage()}</section>
        </div>
      </section>
    );
  }
}

export default Collection;