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

function App() {
  const token = useSelector((state) => state.auth.accessToken);
  return (
    <div className="App">
      {/* <Musicbox /> */}
      <Router>
				<Switch>
					<Route path="/create-playlist">
						{token !== "" ? <CreatePlaylist /> : <Redirect to="/" />}
					</Route>
					<Route exact path="/">
						{token !== "" ? (
							<Redirect to="/create-playlist" />
						) : (
							<LoginPage />
						)}
					</Route>
				</Switch>
			</Router>
    </div>
  );
}

export default App;
