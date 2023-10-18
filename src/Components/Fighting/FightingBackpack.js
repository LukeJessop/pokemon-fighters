import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chosenPokemon } from "../../redux/backpackSlice";
import Pokemon from "../Pokemon/Pokemon";

function FightingBackpack({ healthPack, isFighting, playerHealth }) {
  const dispatch = useDispatch();
  const [pokemonSelected, setPokemonSelected] = useState(false);
  const [selectedPokemonObj, setSelectedPokemonObj] = useState({});
  const [autoSelect, setAutoSelect] = useState(false);

  const reduxBp = useSelector((state) => state.backpack?.data);

  useEffect(() => {
    // setBpPokemon(reduxBp)
    if (reduxBp[0]?.name && !autoSelect) {
      //auto selects pokemon when page is rendered
      // clickedPokemon();
      dispatch(chosenPokemon(reduxBp[0]));
      setPokemonSelected(true);
      setSelectedPokemonObj(reduxBp[0]);
      setAutoSelect(true);
    }
  }, [reduxBp, autoSelect, dispatch]);

  const backpackMap = reduxBp.map((pokemonInfo) => {
    return (
      <div
        className={`backpack-pokemon-container ${
          pokemonInfo.id === selectedPokemonObj.id && "selected-background"
        }`}
        onClick={() => {
          // clickedPokemon();
          dispatch(chosenPokemon(pokemonInfo));
          setPokemonSelected(true);
          setSelectedPokemonObj(pokemonInfo);
        }}
        key={pokemonInfo.pokemon_id}
      >
        <Pokemon noImg={true} pokemon={pokemonInfo} key={pokemonInfo.pokemon_id} />
      </div>
    );
  });

  return (
    <div className="fight-backpack-container">
      {pokemonSelected && isFighting ? (
        <div className="fighter-stats">
          <h2>{selectedPokemonObj.name.toUpperCase()}</h2>
          <h3>Damage: {selectedPokemonObj.damage}</h3>
          <h3>Healthpack Power: {playerHealth / 2}</h3>
          <h3>Healthpacks left: {healthPack}</h3>
        </div>
      ) : (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>{backpackMap}</div>
      )}
    </div>
  );
}

export default FightingBackpack;
