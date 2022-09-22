import axios from "axios";
import { useEffect, useState } from "react";

function FightingBackpack(props) {
  const [bpPokemon, setBpPokemon] = useState([]);
  const [pokemonSelected, setPokemonSelected] = useState(false);
  const [selectedPokemonObj, setSelectedPokemonObj] = useState({});
  useEffect(() => {
    axios
      .get("/api/backpack")
      .then((res) => setBpPokemon(res.data))
      .catch((err) => console.log(err.response.data));
  }, [props.isFighting]);

  const backpackMap = bpPokemon.map((pokemonInfo) => {
    return (
      <div
        className="backpack-pokemon-container"
        onClick={() => {
          props.clickedPokemon(pokemonInfo);
          setPokemonSelected(true);
          setSelectedPokemonObj(pokemonInfo);
        }}
        key={pokemonInfo.pokemon_id}
      >
        <div className="backpack-stats">
          <div className="backpack-lvl">{pokemonInfo.level}</div>
          {pokemonInfo.name}
          <div className="backpack-bars">
            <div style={{ backgroundColor: "green" }}>
              <h6 style={{ margin: "0", padding: "3px", color: "white" }}>
                {pokemonInfo.health}/{pokemonInfo.health}
              </h6>
            </div>
            <div style={{ backgroundColor: "rgb(116, 227, 255)" }}>
              <div
                style={{
                  backgroundColor: "yellow",
                  color: 'black',
                  width: `${
                    pokemonInfo.xp < 100 ? pokemonInfo.xp : pokemonInfo.xp % 100
                  }%`,
                }}
              >
                <h6 style={{ margin: "0", padding: "3px"}}>
                  {pokemonInfo.xp < 100 ? pokemonInfo.xp : pokemonInfo.xp % 100}/100
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="fight-backpack-container">
      {pokemonSelected && props.isFighting ? (
        <div className="fighter-stats">
          <h2>"{selectedPokemonObj.name} I choose you!"</h2>
          <h3>Damage: {selectedPokemonObj.damage}</h3>
          <h3>Healing Power: {props.fighterPokemonHealth / 2}</h3>
          <p>You can only heal once per battle.</p>
        </div>
      ) : (
        <div>{backpackMap}</div>
      )}
    </div>
  );
}

export default FightingBackpack;
