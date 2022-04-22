import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import './index.css'

const CreatePlaylistForm = ({ uriTracks }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.user.id);

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [errorForm, setErrorForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setErrorForm({ ...errorForm, [name]: '' });
  }

  const validateForm = () => {
    let isValid = true;

    if (form.title.length < 10) {
      setErrorForm({
        ...errorForm,
        title: 'Title must be at least 10 characters long'
      });
      isValid = false;
    }

    if (form.description.length > 100) {
      setErrorForm({
        ...errorForm,
        description: 'Description must be less than 100 characters long'
      });
      isValid = false;
    }

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (uriTracks.length > 0) {
        try {
          const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
            name: form.title,
            description: form.description,
          });

          await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);

          toast.success('Playlist created successfully');

          setForm({ title: '', description: '' });
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.error('Please select at least one track');
      }
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
                error={errorForm.title}
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
                error={errorForm.description} />
        </div>
        <button className='btn btn-playlist'>Create Playlist</button>
    </form>
  )
}

export default CreatePlaylistForm;