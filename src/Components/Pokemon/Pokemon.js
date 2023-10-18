import axios from "axios";
import { useEffect, useState } from "react";
import { typeMap } from "../Fighting/typeAdvantage";
import "./iconStyle.css";
import UpArrow from "../../Assets/arrow-up-solid.svg";
import DownArrow from "../../Assets/arrow-down-solid.svg";

function Pokemon({
  advantage,
  disadvantage,
  pokemon,
  playerHealth,
  enemyHealth
}) {
  const [sprite, setSprite] = useState("");
  const [isMaxLevel, setIsMaxLevel] = useState(false);

  useEffect(() => {
    setSprite("");
    axios
      .get(pokemon.pokemonurl || pokemon.pokemonUrl)
      .then((res) => {
        if (pokemon.level >= 100) {
          setIsMaxLevel(true);
          setSprite(res.data.sprites.front_shiny);
        } else {
          setSprite(res.data.sprites.front_default);
        }
      })
      .catch((err) => console.log(err.response.data));
  }, [pokemon.pokemonUrl, pokemon.pokemonurl, pokemon.level]);

  const backgroundColorDecider = (level) => {
    let R = -0.0255 * (level - 100) ** 2 + 255;
    let G = -0.0255 * (level - 50) ** 2 + 255;
    let B = -0.0255 * (level - 0) ** 2 + 255;
    let styleObj = {
      border: "",
      background: `rgb(${R}, ${G}, ${B})`
    };

    if (isMaxLevel) {
      styleObj.border = "3px dashed gold";
      styleObj.background =
        "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)";
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
      </div>
      {/* <span className="pokemon-damage">🗡Damage: {pokemon.damage}</span> */}
      <img className="pokemon-img" alt="pokemon-sprite" src={sprite} />
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", gap: "5px", paddingLeft: "10px" }}>
          {pokemon.types.map((item) => {
            const type = typeMap.filter(
              (typeMapItem) => typeMapItem.type.toLowerCase() === item.type.name
            );
            return (
              <div>
                <img
                  style={{
                    width: "20px",
                    padding: "4px",
                    borderRadius: "50%",
                    boxShadow: "0px 0px 3px #3d3d3d9c"
                  }}
                  alt="pokemon-type"
                  className={type[0].type.toLowerCase()}
                  src={type[0].icon}
                />
              </div>
            );
          })}
        </div>
        <div style={{ paddingRight: "10px" }}>
          {advantage && (
            <img
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#1c9963",
                padding: "5px",
                borderRadius: "50%"
              }}
              src={UpArrow}
              alt="adv"
            />
          )}
          {disadvantage && (
            <img
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ff3333",
                padding: "5px",
                borderRadius: "50%",
                transform: "rotate(180deg)"
              }}
              src={DownArrow}
              alt="adv"
            />
          )}
        </div>
      </div>

      <div className="pokemon-stats-container">
        <div style={{ height: "100%" }}>
          <div className="pokemon-lvl">{pokemon.level}</div>
        </div>
        <div className="pokemon-stat-bars">
          <div className="pokemon-health-bar">
            <div
              className="pokemon-health-bar-progress"
              style={{
                color: "white",
                backgroundColor: "green",
                width: `${
                  (pokemon.health /
                    (enemyHealth ? enemyHealth : playerHealth)) *
                  100
                }%`,
                padding: "3px 2px 3px 2px",
                transition: "all linear 250ms",
                borderRadius: "16px"
              }}
            >
              {pokemon.health}
              {enemyHealth || playerHealth ? "/" : null}
              {enemyHealth ? enemyHealth : playerHealth}
            </div>
          </div>
          <div className="pokemon-xp-bar">
            <div
              className="pokemon-xp-bar-progress"
              style={{
                color: "black",
                backgroundColor: "yellow",
                width: `${pokemon.xp < 100 ? pokemon.xp : pokemon.xp % 100}%`,
                padding: "3px 2px 3px 2px",
                transition: "all linear 250ms",
                borderRadius: "16px"
              }}
            >
              {pokemon.xp < 100 ? pokemon.xp : pokemon.xp % 100}/{100}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
