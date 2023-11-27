// import Auth from "./Components/Auth/Auth";
// import { useLocation } from "react-router-dom";
// import useAuth from "./Components/Hooks/use-auth";
// import axios from "axios";
import componentRouter from "./routes";
import Navbar from "./Components/Nav/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchStarters from "./redux/backpackApi";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://cdn.matomo.cloud/jessoplucas.matomo.cloud/container_ofzxVSjz.js'; s.parentNode.insertBefore(g,s);
   }, [])

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
