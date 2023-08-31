import Auth from "./Components/Auth/Auth";
import { useLocation } from "react-router-dom";
import componentRouter from "./routes";
import Navbar from "./Components/Nav/Navbar";
import { useEffect } from "react";
import useAuth from "./Components/Hooks/use-auth";
import axios from "axios";
import { useDispatch } from "react-redux";
import fetchStarters from "./redux/backpackApi";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchStarters())
  }, [dispatch])

  return (
    <div className="master-container font-link">
      <div className="side-nav-bar">
        <Navbar/>
        {/* {location.pathname === "/" ? <Auth /> : <Navbar />} */}
      </div>
      <div className="page-container">{componentRouter}</div>
    </div>
  );
}

export default App;
