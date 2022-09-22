import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers";

function Regsiter() {
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regPassCon, setRegPassCon] = useState("");
  const navigate = useNavigate();

  const clickHandler = () => {
    if (regUser === "" || regPass === "" || regPassCon === "") {
      window.alert("All feilds must be filled");
      return;
    }
    if (regPass !== regPassCon) {
      window.alert("Passwords do not match");
      return;
    }

    axios
      .post("/auth/register", { regUser, regPass })
      .then((res) => {
        navigate("/gym");
        giveStarters()
      })
      .catch((err) => console.log("register error ", err.response.data));
  };


  const giveStarters = () =>{
      axios
      .get(`https://pokeapi.co/api/v2/pokemon`) //get all pokemon and store them in pokeArr
      .then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let name = res.data.results[i].name
          if(name === 'squirtle' || name === 'bulbasaur' || name === 'charmander'){
            let xp = 100
            let level = xp / 100
            let health = 1.08**level + 100
            let damage = 1.06**(1.3 * level)+ 20
            axios.post("/api/pokemon", {
              id: i,
              name: res.data.results[i].name,
              health: Math.floor(health),
              damage: Math.floor(damage),
              level: Math.floor(level),
              pokemonUrl: res.data.results[i].url,
              xp: xp,
              inBackpack: false,
            });
          }
        }
      }).catch((err) => console.log("useEffect() in Fighting component ", err));

  }

  return (
    <div className="form-container">
      <input
        className="auth-input"
        placeholder="username"
        onChange={(e) => setRegUser(e.target.value)}
      ></input>
      <input
        className="auth-input"
        placeholder="password"
        type="password"
        onChange={(e) => setRegPass(e.target.value)}
      ></input>
      <input
        className="auth-input"
        placeholder="confirm password"
        type="password"
        onChange={(e) => setRegPassCon(e.target.value)}
      ></input>
      <button className="auth-button" onClick={clickHandler}>
        Register
      </button>
    </div>
  );
}

export default Regsiter;
