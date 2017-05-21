import React, { Component } from 'react';
import Navbar from './navbar.js'
import '../styles/collection.css';
import cover01 from '../assets/images/album_covers/01.png';

class Collection extends Component {
  render() {
    return (
      <div className="landing">
        <Navbar/>
        <div className="collection">
          <section className="album-covers container clearfix"></section>
        </div>
      </div>
    );
  }

    componentWillMount(){

    let collectionItemTemplate =
     '<div className="collection-album-container column fourth">'
   + '  <img src={cover01} />'
   + '  <div className="collection-album-info caption">'
   + '    <p>'
   + '      <a className="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;

    let collectionContainer = document.getElementsByClassName('album-covers')[0];
    collectionContainer.innerHTML = '';
 
    for (let i = 0; i < 12; i++) {
      collectionContainer.innerHTML += collectionItemTemplate;
     }
 }
}

export default Collection;