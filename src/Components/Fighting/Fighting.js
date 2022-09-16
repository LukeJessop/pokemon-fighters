import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from '../Pokemon/Pokemon'
import {connect} from 'react-redux'

function Fighting(){
  const [pokeArr, setPokeArr] = useState([]); //array of pokemon from PokeAPI
  const [userPokemon, setUserPokemon] = useState([]); //array of user specific pokemon
    useEffect(() => {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000")
          .then( (res) => {
            //get pokemon from pokeAPI
            let customPokemonArr = []; //create new array to push the custom pokemon object to
            let responseArr = res.data.results;
            for (let i = 0; i < responseArr.length; i++) {
              customPokemonArr.push({
                id: i,
                name: responseArr[i].name,
                pokemonUrl: responseArr[i].url,
                health: 100,
                damage: 10,
                xp: 0,
                level: 1,
                owner: 0,
                inBackpack: false
              });
            }
            setPokeArr(customPokemonArr);
          }).catch((err) => console.log('useEffect() in Fighting component ', err));
      }, []);
    
      const catchPokemon = (pokeId) => { //this function runs when a pokemon is clicked (temporary, we will eventually replace the event trigger with when we win a fight with another pokemon) THIS NEEDS A POKEMON ID OR IT WILL NOT WORK
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

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(Fighting)