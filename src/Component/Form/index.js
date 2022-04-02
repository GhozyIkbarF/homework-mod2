import React from 'react'
import './index.css'

const Form_Playlist = ({onSubmit, onChangeTitle, onChangeDescription}) => {

  return (
    <form className='form-playlist' action="" onSubmit={onSubmit}>
        <h1 className='title-formPlaylist'>Create Playlist</h1>
        <div className="title-playlist">
            {/* <label htmlFor="name">Title</label> */}
            <input
                className='search_input ' 
                type="text" 
                name="title" 
                id="name"
                placeholder='title'
                minLength={10}
                onChange={onChangeTitle} />
        </div>
        <div className="description-playlist">
            {/* <label htmlFor="description">Description</label> */}
            <textarea
                className='search_input' 
                type="text" 
                name="description" 
                id="description"
                placeholder='description'
                onChange={onChangeDescription} />
        </div>
        <button className='btn btn-playlist'>Create Playlist</button>
    </form>
  )
}

export default Form_Playlist;