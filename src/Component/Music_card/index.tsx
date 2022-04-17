import React, { useState } from 'react';
import './index.css';

interface IProps {
  url_image: string;
  title: string;
  artist: string;
  url_spotify: string;
  select: boolean;
  toggleSelect: () => void;
}

const Track: React.FC <IProps> = ({title, artist, url_image, url_spotify, select, toggleSelect }) =>{
  const [isSelected, setIsSelected] = useState<boolean>(select);

  const handleToggleSelect: () => void = () => {
    setIsSelected(!isSelected)
    toggleSelect()
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
  );
}
export default Track;