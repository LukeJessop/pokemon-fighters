import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    axios //this gets the username to display on the navbar component
    .get('/api/user')
    .then((res) => setUsername(res.data.username))
    .catch((err) => console.log(err.response.data))
  },[])

  return (
    <div className="button-container">
      <h3 className="username-text">Welcome {username}</h3>
      <Link to="/gym">
        <button className="btn">Gym</button>
      </Link>
      <Link to="/fighting">
        <button className="btn">Fighting</button>
      </Link>
      <Link to="/">
        <button className="logout btn">Logout</button>
      </Link>
    </div>
  );
}
export default Navbar;
