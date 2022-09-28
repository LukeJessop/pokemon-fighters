import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate()
  const sendRequest = (authMethod, cred) => {
    axios
      .post(`/auth/${authMethod}`, cred)
      .then(() => {
        if (authMethod === "register") {
          giveStarters();
        }else{
          navigate("/gym");
        }
      })
      .catch((err) => alert(`${authMethod} error ` + err.response.data));
  };
  const giveStarters = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon`) //get all pokemon and store them in pokeArr
      .then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          let name = res.data.results[i].name;
          if (
            name === "squirtle" ||
            name === "bulbasaur" ||
            name === "charmander"
          ) {
            let xp = 100;
            let level = xp / 100;
            let health = 1.08 ** level + 100;
            let damage = 1.06 ** (1.3 * level) + 20;
            axios.post("/api/pokemon", {
              id: i,
              name: res.data.results[i].name,
              health: Math.floor(health),
              damage: Math.floor(damage),
              level: Math.floor(level),
              pokemonUrl: res.data.results[i].url,
              xp: xp,
              inBackpack: false
            });
          }
        }
        navigate("/gym");
      })
      .catch((err) => console.log("useEffect() in Fighting component ", err));
  };
  return { sendRequest };
};

export default useAuth;
