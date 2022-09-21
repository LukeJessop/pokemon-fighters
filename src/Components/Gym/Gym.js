import { useState, useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";

function Gym() {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [backpackOpen, setBackpackOpen] = useState(false);
  const [backpack, setBackpack] = useState([]);

  useEffect(() => {
    getUserPokemon();
    getBackpack();
  }, []);

  const getUserPokemon = () => {
    axios
      .get("/api/pokemon")
      .then((res) => {
        setOwnedPokemon(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const getBackpack = () => {
    axios
      .get("/api/backpack")
      .then((res) => {
        setBackpack(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const updateBackpack = (pokemonObj) => {
    const { pokemon_id, inbackpack } = pokemonObj;
    axios
      .put("/api/backpack", { pokemon_id, inbackpack })
      .then(() => {
        getBackpack();
      })

      .catch((err) => console.log(err.response.data));
  };

  const addToBackpack = (element) => {
    if (backpack.length >= 6) {
      //if there are 6 pokemon in bag then trigger alert and exit function
      alert("You can only have 6 Pokemon in your backpack!");
      return;
    }
    for (let i = 0; i < backpack.length; i++) {
      // if there is already a pokemon in the bag then alert and exit function
      if (backpack[i] === element) {
        alert("This pokemon is already in your backpack!");
        return;
      }
    }
    // setBackpack((currentBackpack)=>[...currentBackpack, element]);
    updateBackpack(element);
  };

  const ownedPokemonMap = ownedPokemon.map((e, i) => {
    return (
      <div className="pokemon-div" key={e.pokemon_id}>
        <Pokemon pokemon={e} key={e.pokemon_id}>
          <button className="pokemon-button add" onClick={() => addToBackpack(e)}>+</button>
        </Pokemon>
      </div>
    );
  });

  const backpackMap = backpack.map((e) => {
    return (
      <div className="pokemon-div" key={e.pokemon_id}>
        <Pokemon pokemon={e} key={e.pokemon_id}>
          <button className="pokemon-button remove" onClick={() => updateBackpack(e)}>X</button>
        </Pokemon>
      </div>
    );
  });

  return (
    <div className="gym-container">
      {backpackOpen ? (
        <div className="backpack-container">
          <h3>{backpackMap.length}/6</h3>
            <button
              className="open-backpack-button"
              onClick={() => setBackpackOpen(false)}
            >
              close Backpack
            </button>
          <div className="backpack-pokemon">
            {backpackMap}
          </div>
        </div>
      ) : (
        <div style={{ margin: "15px" }}>
          <button
            className="open-backpack-button"
            onClick={() => setBackpackOpen(true)}
          >
            Open Backpack
          </button>
        </div>
      )}

      <div className="pokemon-list">{ownedPokemonMap}</div>
    </div>
  );
}

export default Gym;
