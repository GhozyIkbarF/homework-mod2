import React from 'react'
import './index.css'
import { useState, useEffect } from 'react'
import MUSIC_CARD from '../../Component/Music_card/Music-card'
import SearchBar from '../../Component/searchBar/index'
// import { Component } from 'react';
import config from '../../Component/data/config';
import Form_Playlist from '../../Component/Form/index'


const Music_card = () => {
    const [access_token, setAccess_token] = useState('');
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState([]);
    const [isInSearch, setIsInSearch] = useState(false);

    useEffect(() => {
      const accessToken = new URLSearchParams(window.location.hash).get('#access_token');
      setAccess_token(accessToken);
      setIsAuthorize(accessToken !== null);
    }, [])

    useEffect(() => {
      if (!isInSearch) {
        const selectedTracks = filterSelectedTracks();
  
        setTracks(selectedTracks);
      }
    }, [selectedTracksUri]);

    const getSpotifyLinkAuthorize = () => {
      const state = Date.now().toString()
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
      return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    };

    const filterSelectedTracks = () => {
      return tracks.filter((track) => selectedTracksUri.includes(track.uri));
    }

    const onSuccessSearch = (searchTracks) => {
      setIsInSearch(true);
      const selectedTracks = filterSelectedTracks();
      const searchDistincTracks = searchTracks.filter((track) => !selectedTracksUri.includes(track.uri));
  
      setTracks([...selectedTracks, ...searchDistincTracks]);
    }

    const clearSearch = () => {
      const selectedTracks = filterSelectedTracks();
      
      setTracks(selectedTracks);
      setIsInSearch(false);
    }

    const toggleSelect = (track) => {
      const uri = track.uri;
  
      if (selectedTracksUri.includes(uri)) {
        setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      } else {
        setSelectedTracksUri([...selectedTracksUri, uri]);
      }
    }
    
    return (
      <div className="container">
        {!isAuthorize && (
          <main className="center">
            <p>Login for next step...</p>
            <a className='btn' href={getSpotifyLinkAuthorize()}>Authorize</a>
          </main>
        )}
        
          <Form_Playlist />

        {isAuthorize && (
          <main className="container" id="home">
            <SearchBar
              accessToken={access_token}
              onSuccess={(tracks) => onSuccessSearch(tracks)}
              onClearSearch={clearSearch}
            />

            <div className="content">
              {tracks.length === 0 && (
                <p>No tracks</p>
              )}

              <div className="cards" style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: 'center',
                }}>

                {tracks.map((song) => (
                  <MUSIC_CARD
                    key={song.id}
                    url_image={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                    url_spotify={song.external_urls.spotify}
                    toggleSelect={() => toggleSelect(song)}
                  />
                ))}

              </div>
            </div>
          </main>
        )}

      
    </div>
    );
}

export default Music_card;


// export default class Sample extends Component {
//     state = {
//       accessToken: '',
//       isAuthorized: false,
//       tracks: []
//     };
    
//     componentDidMount() {
//       const param = this.getHashParams();
//       const accessToken = param.access_token;
//       this.setState({accessToken: accessToken, isAuthorized: accessToken !== undefined});
//     }

//     getHashParams() {
//       const hashParams = {};
//       const r = /([^&;=]+)=?([^&;]*)/g;
//       const q = window.location.hash.substring(1);
//       let e = r.exec(q);
//       while (e) {
//         hashParams[e[1]] = decodeURIComponent(e[2]);
//         e = r.exec(q);
//       }
//       return hashParams;
//     }

//     getSpotifyLinkAuthorize() {
//       const state = Date.now().toString()
//       const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID
//       return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
//     };

//     onSuccessSearch(tracks) {
//       this.setState({ tracks });
//     }
//   render() {
//     return (
//       <div className="container">
//         {!this.state.isAuthorized && (
//           <main className="center">
//             <p>Login for next step...</p>
//             <a className='btn' href={this.getSpotifyLinkAuthorize()}>Authorize</a>
//           </main>
//         )}
        

//         {this.state.isAuthorized && (
//           <main className="container" id="home">
//             <SearchBar
//               accessToken={this.state.accessToken}
//               onSuccess={(tracks) => this.onSuccessSearch(tracks)}
//             />

//             <div className="content">
//               {this.state.tracks.length === 0 && (
//                 <p>No tracks</p>
//               )}

//               <div className="cards" style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   justifyContent: 'center',
//                 }}>

//                 {this.state.tracks.map((song) => (
//                   <MUSIC_CARD
//                     key={song.id}
//                     url_image={song.album.images[0].url}
//                     title={song.name}
//                     artist={song.artists[0].name}
//                     url_spotify={song.external_urls.spotify}
//                   />
//                 ))}

//               </div>
//             </div>
//           </main>
//         )}

      
//     </div>
//     );
//   }
// }

