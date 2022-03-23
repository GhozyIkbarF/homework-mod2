import React from 'react'
import './Music-card.css'
import Data from '../Data/Data';

export default function Music_card() {
  return (
    <div className="card-wrapper">
        <img src={Data.album.images[0].url} alt="" />
        <div className="copy-music">
            <p className='song-title'>{Data.album.name}</p>
            <p>{Data. artists[0].name}</p>
        </div>
        <button type='' name='button'>play</button>
    </div>
  )
}
