import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import './index.css'
import config from'../data/config';

const CreatePlaylistForm = ({ uriTracks }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);
    
    const [form, setForm] = useState({
        title: '',
        description: ''
    }) 

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.title.length > 10){
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                    }
                }
                
                const optionsCreatePlaylist = {
                    ...requestOptions,
                    body: JSON.stringify({
                        name: form.title,
                        description: form.description,
                        public: false,
                        collaborative: false,
                    }),
                }
                
                const responseCreatePlayList = await fetch(`${config.SPOTIFY_BASE_URL}/users/${userId}/playlists`, optionsCreatePlaylist).then(data=> data.json());
                
                const optionsAddTrack = {
                    ...requestOptions,
                    body: JSON.stringify({
                      uriTracks
                     }),
                }
                
                await fetch(`${config.SPOTIFY_BASE_URL}/playlists/${responseCreatePlayList.id}/tracks`, optionsAddTrack).then(data=> data.json());
                
                
                setForm({ title: '', description: '' });
                alert('Playlist created successfully');
                
            } catch (error) {
            alert(error);
            }
        }else{
            alert('Title must be large than 10 characters');
        }
    }

  return (
    <form className='form-playlist' action="" onSubmit={handleSubmit}>
        <h1 className='title-formPlaylist'>Create Playlist</h1>
        <div className="title-playlist">
            <label htmlFor="name">Title</label>
            <input
                className='search_input' 
                type="text" 
                label="Title"
                placeholder="Title of playlist"
                value={form.title}
                id="title-playlist"
                name="title"
                onChange={handleChange}
                required />
        </div>
        <div className="description-playlist">
            <label htmlFor="description">Description</label>
            <textarea
                className='search_input'
                type="text"  
                label="Description"
                placeholder="Description of playlist"
                value={form.description}
                id="description-playlist"
                name="description"
                onChange={handleChange}
                required
                />
        </div>
        <button className='btn btn-playlist'>Create Playlist</button>
    </form>
  )
}

export default CreatePlaylistForm;