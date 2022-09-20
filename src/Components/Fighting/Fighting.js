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
        let pokemonArr = res.data.results;
        for (let i = 0; i < pokemonArr.length; i++) {
          let xp = Math.floor(Math.random() * 10000)
          let level = xp / 100
          let health = 3 * level + 100
          let damage = 3 * level + 10

          setPokeArr((e) => [...e, {
            id: i,
            name: pokemonArr[i].name,
            pokemonUrl: pokemonArr[i].url,
            xp: xp,
            level: Math.floor(level),
            health: Math.floor(health),
            damage: Math.floor(damage),
            owner: 0,
            inBackpack: false,
          }]);
        }
      })
      .catch((err) => console.log("useEffect() in Fighting component ", err));
      if(isFighting){

      }else{
        const interval = setInterval(() => { //This "setInterval()" function runs every millisecond ammount you pass it
          let randomNum = Math.floor(Math.random() * 1154)
          setEnemyPokemon(pokeArr[randomNum])
        }, 5000);
      
        return () => clearInterval(interval); 
      }
    }, [pokeArr.length > 0, isFighting]);
//I beleive the problem here was that the axios request took a little too long to get the pokemon
// by the time th interval loop started the "pokeArr" wasnt filled yet, 
// so I passed into the dependency array of "useEffect" pokeArr.length > 0 and once that condition result changes from false to true
//  then useEffect runs again allowing my interval to not break everything!


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
    <div className="fighting-component">
      <div className="fighting-graphic-container">
        {isFighting ? (
          <div>Fighting currently</div>
        ) : (
          enemyPokemon ? 
          <div className="fighting-enemy-pokemon">
            <h1>A Wild</h1>
            <Pokemon pokemon={enemyPokemon}/>
            <h1>Has Appeared!</h1>
          </div> : null
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
              Fight
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fighting;
