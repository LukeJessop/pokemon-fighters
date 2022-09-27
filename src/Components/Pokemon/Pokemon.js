import axios from "axios";
import { useEffect, useState } from "react";

function Pokemon(props) {
  const [sprite, setSprite] = useState("");
  const [isMaxLevel, setIsMaxLevel] = useState(false);

  const { pokemon, fighterPokemonHealth, enemyPokemonHealth } = props;


  useEffect(() => {
    setSprite('')
    axios
      .get(pokemon.pokemonurl || pokemon.pokemonUrl)
      .then((res) => {
        if (pokemon.level >= 100) {
          setIsMaxLevel(true);
          setSprite(res.data.sprites.front_shiny);
        } else {
          setSprite(res.data.sprites.front_default);
        }
      }).catch((err) => console.log(err.response.data));

    backgroundColorDecider(pokemon.level);


  }, [pokemon.pokemonUrl, pokemon.pokemonurl]);

  const backgroundColorDecider = (level) => {
    let R = -0.6 * (level - 100) ** 2 + 255;
    let G = -0.102 * (level - 50) ** 2 + 255;
    let B = -0.6 * (level - 0) ** 2 + 255;
    let styleObj = {
      border: "",
      background: `rgb(${R}, ${G}, ${B})`,
    };

    if (isMaxLevel) {
      styleObj.border = "3px dashed gold";
      styleObj.background = "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
    }
    return styleObj;
  };



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

      <img className="pokemon-img" src={sprite} />
      <div className="pokemon-stats-container">
        <h2 className="pokemon-lvl">{pokemon.level}</h2>
        <div className="pokemon-stat-bars">
          <div className="pokemon-health-bar">
            <div
              className="pokemon-health-bar-progress"
              style={{
                color: "white",
                backgroundColor: "green",
                width: `${(pokemon.health / (enemyPokemonHealth ? enemyPokemonHealth : fighterPokemonHealth)) * 100}%`,
                padding: '1px'
              }}
              >
              {pokemon.health}{enemyPokemonHealth || fighterPokemonHealth?'/':null}{enemyPokemonHealth ? enemyPokemonHealth : fighterPokemonHealth}
            </div>
          </div>
          <div className="pokemon-xp-bar">
            <div
              className="pokemon-xp-bar-progress"
              style={{
                color: "black",
                backgroundColor: "yellow",
                width: `${pokemon.xp < 100 ? pokemon.xp : pokemon.xp % 100}%`,
                padding: '1px'
              }}
            >
              {pokemon.xp < 100 ? pokemon.xp : pokemon.xp % 100}/{100}
            </div>
          </div>
          <span className="pokemon-damage">🗡 {pokemon.damage}</span>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
