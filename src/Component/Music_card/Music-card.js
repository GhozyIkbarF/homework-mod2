import React from 'react'
import './Music-card.css'

export default function Music_card({title, artist,url_image, url_spotify}) {
  return (
    <div className="card-wrapper">
        <img src={url_image} alt="" />
        <div className="copy-music">
          <p className='song-title'>{title}</p>
          <p className='song-artist'>{artist}</p>
        </div>
        <a className='btn' href={url_spotify}>play</a>
    </div>
  )
}
