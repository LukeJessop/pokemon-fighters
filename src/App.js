
import Auth from "./Components/Auth/Auth";
import {useLocation } from "react-router-dom";
import componentRouter from "./routes";
import Navbar from "./Components/Nav/Navbar";
import ReactGA from 'react-ga'
const TRACKING_ID = "UA-257529921-1"
ReactGA.initialize(TRACKING_ID)

function App() {
  const location = useLocation();


  return (
    <div className="master-container font-link">
      <div className="side-nav-bar">
        {location.pathname === '/' ? (<Auth/>) : (<Navbar/>)}
      </div>
      <div className="page-container">
        {componentRouter}
      </div>
    </div>
  );
}

export default App;
