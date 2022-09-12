import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from '../Pokemon/Pokemon'

function Fighting(){
  const [pokeArr, setPokeArr] = useState([]); //array of pokemon from PokeAPI
  const [userPokemon, setUserPokemon] = useState([]); //array of user specific pokemon
    useEffect(() => {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10")
          .then( (res) => {
            //get pokemon from pokeAPI
            let customPokemonArr = []; //create new array to push the custom pokemon object to
            let responseArr = res.data.results;
            for (let i = 0; i < responseArr.length; i++) {
              axios.get(`${responseArr[i].url}`).then((res) => {
                customPokemonArr[i].frontSprite = res.data.sprites.front_default; //get the front png url of the specific pokemon and assign it to the url in the object
                customPokemonArr[i].backSprite = res.data.sprites.back_default; //get the back png url of the specific pokemon and assign it to the url in the object
              });
              customPokemonArr.push({
                id: i,
                name: responseArr[i].name,
                frontSprite: "",
                backSprite: "",
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
      
    const pokemonMap = pokeArr.map((e) => {
      return(
          <Pokemon pokemon={e}/>
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

export default Fighting