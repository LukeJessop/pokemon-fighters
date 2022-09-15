import { useState, useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";

function Gym() {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  useEffect(() => {
    axios
    .get("/api/pokemon")
    .then((res) => {
      setOwnedPokemon(res.data);
    })
    .catch((err) => console.log(err.response.data));
  }, []);

  const ownedPokemonMap = ownedPokemon.map((e, i) => {
    return(
      <Pokemon pokemon={e} key={i} />

    )
});
  return (
    <div>
      <h1>Train your pokemon!</h1>
      <div className="pokemon-list">{ownedPokemonMap}</div>
    </div>
  );
}


export default Gym;
