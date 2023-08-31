import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar() {
  // const [username, setUsername] = useState('Player')
  
  // useEffect(() => {
  //   axios //this gets the username to display on the navbar component
  //     .get('/api/user')
  //     .then((res) => setUsername(res.data.username))
  //     .catch((err) => console.log(err.response.data + ' error with getting name for nav'))
  // },[])

  // const logout = () => {
  //   axios
  //     .delete('/api/user')
  //     .then(() => setUsername(''))
  //     .catch((err) => console.log(err.response.data + ' error with logging out'))
  // }

  return (
    <div className="button-container" style={{ padding: '18px'}}>
      <h1 className="username-text">Pokemon Fighters</h1>
      <Link to="/">
        <button className="btn">Backpack</button>
      </Link>
      <Link to="/fighting">
        <button className="btn">Fighting</button>
      </Link>
      <div style={{height: '100%', display: 'flex', alignItems: 'end', color: '#f667ff'}}>
        <h3>
          Do not refresh your browser!! <br/> <br/> You will lose your progress!!
        </h3>
      </div>
    </div>
  );
}
export default Navbar;
