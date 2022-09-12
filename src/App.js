
import Auth from "./Auth/Auth";
import { Link, useLocation } from "react-router-dom";
import componentRouter from "./routes";

function App() {
  const location = useLocation();
  

  return (
    <div className="master-container font-link">
      <div className="side-nav-bar">
        {location.pathname === "/" ? (
          <Auth />
        ) : (
          <div className="button-container">
            <Link to="/gym">
              <button id="btn">Gym</button>
            </Link>
            <Link to="/fighting">
              <button id="btn">Fighting</button>
            </Link>
            <Link to="/hospital">
              <button id="btn">Hospital</button>
            </Link>
            <Link to="/">
              <button className="logout" id="btn">Logout</button>
            </Link>
          </div>
        )}
        {/* add logic somewhere in here that switches between auth and the buttons when logged in */}
        {/*these vv buttons are the navigation system that changes state when each button is clicked*/}
      </div>
      <div className="page-container">{componentRouter}</div>
    </div>
  );
}

export default App;
