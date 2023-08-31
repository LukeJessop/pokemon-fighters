import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
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

            var current = sessionStorage.getItem('pokemon');
            if (!current) { // check if an item is already registered
              current = []; // if not, we initiate an empty array
            } else {
              current = JSON.parse(current); // else parse whatever is in
            }
            current.push({
              id: i,
              name: res.data.results[i].name,
              health: Math.floor(health),
              damage: Math.floor(damage),
              level: Math.floor(level),
              pokemonUrl: res.data.results[i].url,
              xp: xp,
              inBackpack: false
            }); // add the item
            console.log(current)
            sessionStorage.setItem('pokemon', JSON.stringify(current));
            
            // localStorage.setItem('pokemon', {
            //   id: i,
            //   name: res.data.results[i].name,
            //   health: Math.floor(health),
            //   damage: Math.floor(damage),
            //   level: Math.floor(level),
            //   pokemonUrl: res.data.results[i].url,
            //   xp: xp,
            //   inBackpack: false
            // })
            // axios.post("/api/pokemon", {
            //   id: i,
            //   name: res.data.results[i].name,
            //   health: Math.floor(health),
            //   damage: Math.floor(damage),
            //   level: Math.floor(level),
            //   pokemonUrl: res.data.results[i].url,
            //   xp: xp,
            //   inBackpack: false
            // });
          }
        }
      })
      .catch((err) => console.log("useEffect() in Fighting component ", err));
  };
  return { giveStarters };
};

export default useAuth;
