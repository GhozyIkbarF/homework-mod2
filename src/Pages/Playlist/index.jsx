import React, { useState, useEffect } from "react";
import SearchBar from "../../Component/searchBar";
import CreatePlaylistForm from "../../Component/Form/index";
import "./index.css";
import Track from "../../Component/Music_card/index";

const CreatePlaylist = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTracksUri, setSelectedTracksUri] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isInSearch, setIsInSearch] = useState(false);
  const [message, setMessage] = useState('No tracks');

  useEffect(() => {
    if (!isInSearch) {
      setTracks(selectedTracks);
    }
  }, [selectedTracksUri, selectedTracks, isInSearch]);

  const onSuccessSearch = (searchTracks, query) => {
    setIsInSearch(true);

    const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

    setTracks(() => {
      const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];

      if (_tracks.length === 0) {
        setMessage(`No tracks found with query "${query}"`);
      } else {
        setMessage('');
      }

      return _tracks;
    });
  }

  const clearSearch = () => {
    setTracks(selectedTracks);
    setMessage('No tracks');
    setIsInSearch(false);
  }

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selectedTracksUri.includes(uri)) {
      setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
      setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
    } else {
      setSelectedTracksUri([...selectedTracksUri, uri]);
      setSelectedTracks([...selectedTracks, track]);
    }
  }

  console.log(selectedTracksUri)
    return (
      <div className="container">
        <CreatePlaylistForm uriTracks={selectedTracksUri}/>

          <main className="main"  id="home">
            <SearchBar
              onSuccess={onSuccessSearch}
              onClearSearch={clearSearch}
            />

            <div className="content">
              {tracks.length === 0 && (
                <p>{message}</p>
              )}

              <div className="music-box" data-testid = "tracks-list">

                {tracks.map((song) => (
                  // eslint-disable-next-line react/jsx-pascal-case
                  <Track
                    key={song.id}
                    url_image={song.album.images[0].url}
                    title={song.name}
                    artist={song.artists[0].name}
                    url_spotify={song.external_urls.spotify}
                    select={selectedTracksUri.includes(song.uri)}
                    toggleSelect={() => toggleSelect(song)}
                  />
                ))}

              </div>
            </div>
          </main>
        
    </div>
    );
};

export default CreatePlaylist;