import axios from "axios";
import { useEffect, useState } from "react";

function Pokemon(props) {
  const [sprite, setSprite] = useState('');
  
  useEffect(() => {
    if(props.pokemon.pokemonurl){
      axios
        .get(props.pokemon.pokemonurl)
        .then((res) => {
          setSprite(res.data.sprites.front_default);
        })
        .catch((err) => console.log(err.response.data));
    }else{
      axios
        .get(props.pokemon.pokemonUrl)
        .then((res) => {
          setSprite(res.data.sprites.front_default);
        })
        .catch((err) => console.log(err.response.data));
    }
  }, []);


  return (
    <div
      key={props.pokemon.pokemon_id}
      className="pokemon-container"
    >
      <h2 className="pokemon-name">{props.pokemon.name}</h2>
      <img className="pokemon-img" src={sprite}/>
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
