import React, { Component } from 'react';
import Navbar from './navbar.js'
import '../styles/collection.css';
import cover from '../assets/images/album_covers/01.png';

// The code below triggers Home component for some reason, to find out
/*class Collection extends Component {
  render() {
    return (
      <div className="collection">
          <Navbar />
          <section className="album-covers container clearfix">
              <div className="collection-album-container column fourth">
                  <img src={cover}/>
                  <div className="collection-album-info caption">
                      <p>
                          <a className="album-name" href="#">The Colors</a>
                          <br/>
                          <a href="#">Pablo Picasso</a>
                          <br/>
                          X songs
                          <br/>
                      </p>
                  </div>
              </div>
              <div className="collection-album-container column fourth">
                  <img src={cover}/>
                  <div className="collection-album-info caption">
                      <p>
                          <a className="album-name" href="#">The Colors</a>
                          <br/>
                          <a href="#">Pablo Picasso</a>
                          <br/>
                          X songs
                          <br/>
                      </p>
                  </div>
              </div>
              <div className="collection-album-container column fourth">
                  <img src={cover}/>
                  <div className="collection-album-info caption">
                      <p>
                          <a className="album-name" href="#">The Colors</a>
                          <br/>
                          <a href="#">Pablo Picasso</a>
                          <br/>
                          X songs
                          <br/>
                      </p>
                  </div>
              </div>
              <div className="collection-album-container column fourth">
                  <img src={cover}/>
                  <div className="collection-album-info caption">
                      <p>
                          <a className="album-name" href="#">The Colors</a>
                          <br/>
                          <a href="#">Pablo Picasso</a>
                          <br/>
                          X songs
                          <br/>
                      </p>
                  </div>
              </div>
          </section>
      </div>
    )
  }
}*/


class Collection extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar/>
        <div className="collection-page">
          <section className="album-covers container clearfix"></section>
        </div>
      </div>
    );
  }

    componentDidMount(){
 let buildCollectionItemTemplate = function () {
    let template =
     `<div className="collection-album-container column fourth">
      <img src={cover} />
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
    </div>`
   ;
   return template;
 }

    let collectionContainer = document.getElementsByClassName('album-covers')[0];
    collectionContainer.innerHTML = '';
 
    for (let i = 0; i < 12; i++) {
      let newThumbnail = buildCollectionItemTemplate();
      collectionContainer.innerHTML += newThumbnail;
     }
     console.log(collectionContainer.innerHTML);
 }
}

export default Collection;