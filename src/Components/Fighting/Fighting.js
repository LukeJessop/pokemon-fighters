import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import FightingBackpack from "./FightingBackpack";

function Fighting() {
  const [pokeArr, setPokeArr] = useState([]); //array of custom stat pokemon from PokeAPI

  const [enemyPokemon, setEnemyPokemon] = useState()

  const [backpackOpen, setBackpackOpen] = useState(false);
  const [isFighting, setIsFighting] = useState(false);
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154") //get all pokemon and store them in pokeArr
      .then((res) => {
        //get pokemon from pokeAPI
        let customPokemonArr = []; //create new array to push the custom pokemon object to
        let pokemonArr = res.data.results;
        for (let i = 0; i < pokemonArr.length; i++) {
          customPokemonArr.push({
            id: i,
            name: pokemonArr[i].name,
            pokemonUrl: pokemonArr[i].url,
            health: 100,
            damage: 10,
            xp: 0,
            level: 1,
            owner: 0,
            inBackpack: false,
          });
        }
        setPokeArr(customPokemonArr);
      })
      .catch((err) => console.log("useEffect() in Fighting component ", err));

      // setTimeout(() => {
      //   let randomNum = Math.floor(Math.random() * 1154)
      //   setEnemyPokemon([pokeArr[randomNum]])
      // }, 10000)

      const interval = setInterval(() => { //I FOUND THIS CODE ON STACK OVER FLOW INVESTIGATE FURTHER
        let randomNum = Math.floor(Math.random() * 1154)
        // setEnemyPokemon([pokeArr[randomNum]])
        console.log(pokeArr[randomNum])
      }, 1000);
    
      return () => clearInterval(interval);
  }, []);


  const catchPokemon = (pokeId) => {
    //this function will run when you win a fight with another pokemon
    const { id, name, health, damage, level, pokemonUrl, xp, inBackpack } = pokeArr[pokeId];
    axios.post("/api/pokemon", {
      id,
      name,
      health,
      damage,
      level,
      pokemonUrl,
      xp,
      inBackpack,
    });
  };
  return (
    <>
      <div className="fighting-graphic-container">
        {isFighting ? (
          <div>Fighting currently</div>
        ) : (
          <div>
            {enemyPokemon}
          </div>
        )}
      </div>

      <div className="fighting-UI-container">
        {backpackOpen ? (
          <div className="fighting-container backpack">
            <button onClick={() => setBackpackOpen(false)}>Back</button>
            <FightingBackpack />
          </div>
        ) : (
          <div className="fighting-container backpack">
            <button
              className="fighting-button"
              onClick={() => setBackpackOpen(true)}
            >
              Backpack
            </button>
          </div>
        )}

        {isFighting ? (
          <div className="fighting-container buttons">
            <button className="fighting-button">Attack</button>
            <button className="fighting-button">Heal</button>
          </div>
        ) : (
          <div className="fighting-container buttons">
            <button disabled className="fighting-button">
              Attack
            </button>
            <button disabled className="fighting-button">
              Heal
            </button>
          </div>
        )}
        <div className="fighting-container fight-or-flight">
          {isFighting ? (
            <button
              className="fighting-button"
              onClick={() => setIsFighting(false)}
            >
              Run Away
            </button>
          ) : (
            <button
              className="fighting-button"
              onClick={() => setIsFighting(true)}
            >
              Attack
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Fighting;
