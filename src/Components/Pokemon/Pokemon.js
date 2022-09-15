import axios from "axios";
import { useEffect, useState } from "react";

function Pokemon(props) {
  const [facingFront, setFacingFront] = useState(true);
  const [frontSprite, setFrontSprite] = useState("");
  const [backSprite, setBackSprite] = useState("");
  useEffect(() => {
    if(props.pokemon.pokemonurl){
      axios
        .get(props.pokemon.pokemonurl)
        .then((res) => {
          setFrontSprite(res.data.sprites.front_default);
          setBackSprite(res.data.sprites.back_default);
        })
        .catch((err) => console.log(err.response.data));
    }else{
      axios
        .get(props.pokemon.pokemonUrl)
        .then((res) => {
          setFrontSprite(res.data.sprites.front_default);
          setBackSprite(res.data.sprites.back_default);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, []);

  return (
    <div
      key={props.pokemon.pokemon_id}
      style={{
        backgroundImage: `url(${facingFront ? frontSprite : backSprite})`,
      }}
      className="pokemon-container"
      onClick={() => {
        facingFront ? setFacingFront(false) : setFacingFront(true);
      }}
    >
      <h2 className="pokemon-name">{props.pokemon.name}</h2>
      <div className="pokemon-stats-container">
        <h2 className="pokemon-lvl">{props.pokemon.level}</h2>
        <h5 className="pokemon-health">💛 {props.pokemon.health}</h5>
        <h5 className="pokemon-damage">🗡 {props.pokemon.damage}</h5>
        <h5>⭐️ {props.pokemon.xp}</h5>
      </div>
    </div>
  );
}

export default Pokemon;
