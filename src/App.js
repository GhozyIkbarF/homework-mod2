import './App.css';
// import Musicbox from './Pages/Music-card/index'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePlaylist from "./Pages/Playlist/index";
import LoginPage from "./Pages/loginPage/index";

const App = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path={"/create-playlist"}>
          {isLogin ? (
            <CreatePlaylist />
          ):(
            <Redirect to={"/"}/>
        )}
        </Route>
        <Route path={"/"} >
          <LoginPage/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
