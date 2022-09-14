
import Auth from "./Components/Auth/Auth";
import {useLocation } from "react-router-dom";
import componentRouter from "./routes";
import Navbar from "./Components/Nav/Navbar";
import {connect} from 'react-redux'

function App(props) {
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

const mapStateToProps = state => state
export default connect(mapStateToProps)(App);
