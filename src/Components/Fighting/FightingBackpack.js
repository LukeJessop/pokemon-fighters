import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chosenPokemon } from "../../redux/backpackSlice";

function FightingBackpack({ clickedPokemon, isFighting, playerHealth }) {
  const dispatch = useDispatch();
  const [pokemonSelected, setPokemonSelected] = useState(false);
  const [selectedPokemonObj, setSelectedPokemonObj] = useState({});
  const [autoSelect, setAutoSelect] = useState(false);

  const reduxBp = useSelector((state) => state.backpack?.data);

  useEffect(() => {
    // setBpPokemon(reduxBp)
    if (reduxBp[0]?.name && !autoSelect) {
      //auto selects pokemon when page is rendered
      clickedPokemon();
      dispatch(chosenPokemon(reduxBp[0]));
      setPokemonSelected(true);
      setSelectedPokemonObj(reduxBp[0]);
      setAutoSelect(true);
    }
  }, [reduxBp, clickedPokemon, autoSelect, dispatch]);

  const backpackMap = reduxBp.map((pokemonInfo) => {
    return (
      <div
        className={`backpack-pokemon-container ${
          pokemonInfo.id === selectedPokemonObj.id && "selected-background"
        }`}
        onClick={() => {
          clickedPokemon();
          dispatch(chosenPokemon(pokemonInfo));
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
                  color: "black",
                  width: `${
                    pokemonInfo.xp < 100 ? pokemonInfo.xp : pokemonInfo.xp % 100
                  }%`
                }}
              >
                <h6 style={{ margin: "0", padding: "3px" }}>
                  {pokemonInfo.xp < 100 ? pokemonInfo.xp : pokemonInfo.xp % 100}
                  /100
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
      {pokemonSelected && isFighting ? (
        <div className="fighter-stats">
          <h2>"{selectedPokemonObj.name} I choose you!"</h2>
          <h3>Damage: {selectedPokemonObj.damage}</h3>
          <h3>Healing Power: {playerHealth / 2}</h3>
          <p>You can only heal once per battle.</p>
        </div>
      ) : (
        <div>{backpackMap}</div>
      )}
    </div>
  );
}

export default FightingBackpack;
