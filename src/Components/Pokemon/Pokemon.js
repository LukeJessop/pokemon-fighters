import axios from "axios";
import { useEffect, useState } from "react";

function Pokemon(props) {
  const [sprite, setSprite] = useState('');
  const [isMaxLevel, setIsMaxLevel] = useState(false)
  const {pokemon} = props
  useEffect(() => {
      axios
        .get(pokemon.pokemonurl || pokemon.pokemonUrl)
        .then((res) => {
          if(pokemon.level >= 100){
            setIsMaxLevel(true)
            setSprite(res.data.sprites.front_shiny)
          }else{
            setSprite(res.data.sprites.front_default);

          }


        })
        .catch((err) => console.log(err.response.data));
  }, [pokemon.pokemonUrl, pokemon.pokemonurl]);


  const backgroundColorDecider = (level) =>{
    let R = (-0.6 * (level - 100)**2) + 255
    let G = (-0.102 * (level - 50)**2) + 255
    let B = (-0.6 * (level - 0)**2) + 255

    let styleObj = {
      border: '',
      background: `rgb(${R}, ${G}, ${B})`,
    }
    if(isMaxLevel){
      styleObj.border = '3px dashed gold'
      styleObj.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'
    }
    return styleObj
  }


  return (
    <div
      key={pokemon.pokemon_id}
      className="pokemon-container"
      style={backgroundColorDecider(pokemon.level)}
    >
      <div className="pokemon-header">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        {props.children}
      </div>
      
      <img className="pokemon-img" src={sprite}/>
      <div className="pokemon-stats-container">
        <h className="pokemon-lvl">{pokemon.level}</h>
        <h5 className="pokemon-health">💛 {pokemon.health}</h5>
        <h5 className="pokemon-damage">🗡 {pokemon.damage}</h5>
        <h5>⭐️ {pokemon.xp}</h5>
      </div>
    </div>
  );
}

export default Pokemon;
