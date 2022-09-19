import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from '../Pokemon/Pokemon'

function Fighting(){
  const [pokeArr, setPokeArr] = useState([]); //array of custom stat pokemon from PokeAPI
    useEffect(() => {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154")
          .then( (res) => {
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
                inBackpack: false
              });
            }
            console.log(customPokemonArr[1])
            setPokeArr(customPokemonArr);
          }).catch((err) => console.log('useEffect() in Fighting component ', err));
      }, []);

      const catchPokemon = (pokeId) => { //this function runs when a pokemon is clicked (TEMPORARY!! We will eventually replace the event trigger with when we win a fight with another pokemon) THIS NEEDS A POKEMON ID OR IT WILL NOT WORK
        const { id, name, health, damage, level, pokemonUrl, xp, inBackpack } = pokeArr[pokeId];
        axios.post("/api/pokemon", {id, name, health, damage, level, pokemonUrl, xp, inBackpack});
      };
  
  
  const pokemonMap = pokeArr.map((e, i) => <div key={i} onClick={() => catchPokemon(e.id)}><Pokemon pokemon={e} key={i}/></div>)
    return(
        <div>
          <h1>Battle!</h1>
            <div className="pokemon-list">
              {pokemonMap}
            </div>
        </div>
    )
}

export default Fighting