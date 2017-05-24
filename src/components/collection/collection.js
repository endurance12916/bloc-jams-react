import React, { Component } from 'react';
import Navbar from '../navbar/navbar.js'
import './collection.css';
import cover from '../../assets/images/album_covers/01.png';
import { BrowserRouter as Router, Link } from 'react-router-dom'

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

/*const Album = (
    <div className="collection-album-container column fourth">
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
    </div>
)*/

class Collection extends Component {
    constructor(props) {
        super(props);
        // console.log(this);
        const album = (
            <div className="collection-album-container column fourth">
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
            </div>
            )
        const albumArray = [];
        while (albumArray.length<12) {albumArray.push(album)}
        this.state = {
            albumArray
        };
    }

    //     componentDidMount(){
    //         console.log(this.state.albumArray);
    //         console.log(this.state.album);
    //     while(this.state.albumArray.length<12){this.state.albumArray.push(this.state.album)};
    //     this.setState({albumArray:this.state.albumArray})
    //     this.state.albumArray.map((album,i)=>{
    //         return <albumArray value={album} key={i} />;
    //     })
    //     console.log(this.state.albumArray);
    // }

  render() {

    return (
      <section className="landing">
        <Navbar/>
        <div className="collection-page">
          <section className="album-covers container clearfix">{
              this.state.albumArray.map((album,i)=>{
              console.log({album});
              console.log(this.state.albumArray[0]); 
              return <div key={i}>{album}</div>})
              }
          </section>
        </div>
      </section>
    );
  }

//     componentDidMount(){
//  let buildCollectionItemTemplate = function () {
//     let template =
//      `<div className="collection-album-container column fourth">
//       <img src={cover} />
//       <div className="collection-album-info caption">
//         <p>
//           <Link to="/album" className="album-name"> The Colors </Link>
//           <br/>
//           <Link to="/album"> Pablo Picasso </Link>
//           <br/>
//           X songs
//           <br/>
//         </p>
//       </div>
//     </div>`
//    ;
//    return template;
//  }

//     let collectionContainer = document.getElementsByClassName('album-covers')[0];
//     collectionContainer.innerHTML = '';
 
//     for (let i = 0; i < 12; i++) {
//       let newThumbnail = buildCollectionItemTemplate();
//       collectionContainer.innerHTML += newThumbnail;
//      }
//      console.log(collectionContainer.innerHTML);
//  }
}

export default Collection;