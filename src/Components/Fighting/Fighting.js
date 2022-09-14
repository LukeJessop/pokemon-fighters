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
                owner: "",
              });
            }
            setPokeArr(customPokemonArr);
          }).catch((err) => console.log('useEffect() in Fighting component ', err));
      }, []);
      
    const pokemonMap = pokeArr.map((e, i) => {
      return(
          <Pokemon pokemon={e} key={i}/>
      )
    })
    return(
        <div> 
          <div>
            {userPokemon === [] ? 
            <img src={userPokemon[0].backSprite}/>
            :null
            // change this img ^ when you have userPokemon as an array that is taken from the db
            }
            <img/>
            <div>
              <button>attack</button>
            </div>

          </div>

            {/* UNDER THIS LINE IS NOT USERS POKEMON */}
            <div className="pokemon-list">
              {pokemonMap}
            </div>
        </div>
    )
}

function mapStateToProps(state){
  return {
      username: state.username,
      userId: state.userId
  }
}

export default connect(mapStateToProps)(Fighting)