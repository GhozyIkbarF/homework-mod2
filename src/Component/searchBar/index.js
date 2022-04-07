import './index.css'
import { useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const SearchBar = ({onSuccess, onClearSearch }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [text, setText] = useState('');
  const [isClear, setIsClear] = useState(true);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks);
      setIsClear(false);
    } catch (e) {
      toast.error(e);
    }
  }

  const handleClear = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

  return (
    <div className="search-bar">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Artist, Song, Album...'
          className='search_input search_inputSong'
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
