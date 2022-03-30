import React, { Component } from 'react'
import config from '../data/config';
import './index.css'

export default class searchBar extends Component {
    state = {
        text: '',
    }

    handleInput(e) {
        this.setState({
            text: e.target.value,
        })
    }

    async onSubmit(e) {
      e.preventDefault();
  
      const { text } = this.state;
  
      var requestOptions = {
        headers: {
          'Authorization': 'Bearer ' + this.props.accessToken,
          'Content-Type': 'application/json',
        },
      };
  
      try {
        const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
          .then((data) => data.json());
  
        const tracks = response.tracks.items;
        this.props.onSuccess(tracks);
      } catch (e) {
        alert(e);
      }
  
      e.target.blur();
    }

  render() {
    return (
      <form action="" onSubmit={(e) => this.onSubmit(e)}>
          <input 
            type="text" 
            placeholder='Artist, Song, Album...'
            className='search_input'
            required
            onChange={(e) => this.handleInput(e)}
            />
            <button className='btn btn-search' type='submit'>Search</button>
      </form>
    )
  }
}
