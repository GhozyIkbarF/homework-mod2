import React from 'react'
import './Music-card.css'
import { useState } from 'react'

export default function Music_card({title, artist,url_image, url_spotify, select, toggleSelect}) {
  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  
  return (
    <div className="card-wrapper">
        <div className="copy-music">
          <img src={url_image} alt="" />
          <p className='song-title'>{title}</p>
          <p className='song-artist'>{artist}</p>
        </div>
        <div className="play-music">
          <a className='btn btn-linkSpotify' href={url_spotify}>play</a>
          <button className='btn' onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</button>
        </div>
    </div>
  )
}
