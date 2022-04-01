import React, { Component } from 'react'
import config from '../data/config';
import './index.css'
import { useState } from 'react';

const SearchBar = ({ accessToken, onSuccess, onClearSearch }) => {
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
        .then((data) => data.json());
  
      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      alert(e);
    }
  
    e.target.blur();
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div className="search-bar">
      <form action="" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder='Artist, Song, Album...'
          className='search_input'
          required
          onChange={(e) => handleInput(e)} />
        <button type="submit" className='btn btn-search'>Search</button>
      </form>

      {!isClear && <button className='btn btn-clear' onClick={() => handleClear()}>Clear Search</button>}
    </div>
  )
}

export default SearchBar;

// export default class searchBar extends Component {
//     state = {
//         text: '',
//     }

//     handleInput(e) {
//         this.setState({
//             text: e.target.value,
//         })
//     }

//     async onSubmit(e) {
//       e.preventDefault();
  
//       const { text } = this.state;
  
//       var requestOptions = {
//         headers: {
//           'Authorization': 'Bearer ' + this.props.accessToken,
//           'Content-Type': 'application/json',
//         },
//       };
  
//       try {
//         const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
//           .then((data) => data.json());
  
//         const tracks = response.tracks.items;
//         this.props.onSuccess(tracks);
//       } catch (e) {
//         alert(e);
//       }
  
//       e.target.blur();
//     }

//   render() {
//     return (
//       <form action="" onSubmit={(e) => this.onSubmit(e)}>
//           <input 
//             type="text" 
//             placeholder='Artist, Song, Album...'
//             className='search_input'
//             required
//             onChange={(e) => this.handleInput(e)}
//             />
//             <button className='btn btn-search' type='submit'>Search</button>
//       </form>
//     )
//   }
// }
