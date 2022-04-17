import React, { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { searchTrack } from '../../lib/fetchApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TRootState } from '../../store';
import Button from '@mui/material/Button';

interface IProps {
  onSuccess: (tracks: any[], text: string) => void;
  onClearSearch: () => void;
}

const SearchBar: React.FC<IProps> = ({ onSuccess, onClearSearch }) => {
  const accessToken: string = useSelector((state: TRootState) => state.auth.accessToken);
  const [text, setText] = useState<string>('');
  const [isClear, setIsClear] = useState<boolean>(true);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  }

  const handleSubmit: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const response: any = await searchTrack(text, accessToken);

      const tracks = response.tracks.items;
      onSuccess(tracks, text);
      setIsClear(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  const handleClear: () => void = () => {
    onClearSearch();
    setText('');
    setIsClear(true);
  }

    return(
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

        {!isClear && <Button variant="contained" color="success" onClick={handleClear}>Clear Search</Button>}
    </div>
    )
}
export default SearchBar;




// import './index.css'
// import { useState } from 'react';
// import { searchTrack } from '../../lib/fetchApi';
// import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
// import Button from '@mui/material/Button';

// const SearchBar = ({onSuccess, onClearSearch }) => {
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   const [text, setText] = useState('');
//   const [isClear, setIsClear] = useState(true);

//   const handleInput = (e) => {
//     setText(e.target.value);
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await searchTrack(text, accessToken);

//       const tracks = response.tracks.items;
//       onSuccess(tracks);
//       setIsClear(false);
//     } catch (e) {
//       toast.error(e);
//     }
//   }

//   const handleClear = () => {
//     onClearSearch();
//     setText('');
//     setIsClear(true);
//   }

//   return (
//     <div className="search-bar">
//       <form action="" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder='Artist, Song, Album...'
//           className='search_input search_inputSong'
//           required
//           onChange={(e) => handleInput(e)} />
//         <button type="submit" className='btn btn-search'>Search</button>
//       </form>

//       {!isClear && <Button variant="contained" color="success" onClick={() => handleClear()}>Clear Search</Button>}
//     </div>
//   )
// }

// export default SearchBar;


