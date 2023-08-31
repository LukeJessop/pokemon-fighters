import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import FightingBackpack from "./FightingBackpack";
import { useDispatch } from "react-redux";
import {addNewPokemon, levelUp} from '../../redux/backpackSlice'

function Fighting() {
  const dispatch = useDispatch()
  const [pokeArr, setPokeArr] = useState([]); //array of custom stat pokemon from PokeAPI

  const [enemyPokemon, setEnemyPokemon] = useState() //the random pokemon 
  const [enemyPokemonHealth, setEnemyPokemonHealth] = useState() //copy of the health of that random pokemon

  const [fighterPokemon, setFighterPokemon] = useState() //user chosen pokemon
  const [fighterPokemonHealth, setFighterPokemonHealth] = useState() //copy of the health of user chosen pokemon

  const [isFighting, setIsFighting] = useState(false); // triggers fighting mode

  const [isPlayersTurn, setIsPlayersTurn] = useState(true) //determines if its the users turn or not
  const [healed, setHealed] = useState(false) // has the healed button been pressed?


  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154") //get all pokemon and store them in pokeArr
      .then((res) => {
        let pokemonArr = res.data.results;
        for (let i = 0; i < pokemonArr.length; i++) {
          let xp = Math.floor(Math.random() * 10000)
          let level = xp / 100
          let health = 1.08**level + 100
          let damage = 1.06**(1.3 * level)+ 20
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
      }).catch((err) => console.log("useEffect() in Fighting component ", err));
      
      if(!isFighting){ // if fighting mode is not true
        const interval = setInterval(() => {// cycle through the pokeAPI array and display each one every 5 seconds
          getRandomPokemon()
        }, 5000);
        
        return () => clearInterval(interval); //cleanup interval function
      }
    }, [pokeArr.length > 0, isFighting]); // rerun useState if pokeArr.length > 0, and isFighting change state at all

//I beleive the problem here was that the axios request took a little too long to get the pokemon
// by the time th interval loop started the "pokeArr" wasnt filled yet, 
// so I passed into the dependency array of "useEffect" pokeArr.length > 0 and once that condition result changes from false to true
//  then useEffect runs again allowing my interval to not break everything!

  const getClickedBackpackPokemon = (e) => { //triggered when a pokemon from your backpack is clicked on
    let newObj = {...e}
    setFighterPokemon(newObj)//sets the fighter pokemon to the arg (arg = the backpack pokemon that is clicked) we lifted from backpack
    setFighterPokemonHealth(e.health) //sets the health of the fighter
  }


  const getRandomPokemon =() => {
    let randomNum = Math.floor(Math.random() * 1154) // generate random number out of 1154 (ammount of pokemon from pokeAPI)
    setEnemyPokemon(pokeArr[randomNum]) // set the enemy pokemon to a random pokemon from the pokeAPI
    setEnemyPokemonHealth(pokeArr[randomNum].health) // copy's the health of the random pokemon to a new state variable
  }

  const enemyAttack = () => {
    setTimeout(() => {
      if(fighterPokemon.health - enemyPokemon.damage > 0){
        fighterPokemon.health -= enemyPokemon.damage
        setIsPlayersTurn(true)
      }else{
        alert("You lost! Don't worry, your pokemon made it to safety.")
        fighterPokemon.health = fighterPokemonHealth
        setIsFighting(false)
        setHealed(false)
        setIsPlayersTurn(true)
        getRandomPokemon()
      }
    }, 1000)
  }

  const userAttack = () => {
    if(enemyPokemon.health - fighterPokemon.damage > 0){ //if enemy pokemon.health - fighter damage > 0
      enemyPokemon.health -= fighterPokemon.damage //set enemyPokemon.health -= damage
      setIsPlayersTurn(false) //end turn and go to enemy's turn
    }else{
      alert('You won! You have caught this pokemon, and your pokemon increases in skill!')
      enemyPokemon.health = enemyPokemonHealth //reset health of pokemon 
      catchPokemon()
      getRandomPokemon()
      dispatch(levelUp(fighterPokemon))
      setIsFighting(false) //the rest of this function resets to base values
      setHealed(false) 
      setIsPlayersTurn(true)
      return // end function
    }
    enemyAttack()
  }

  const heal = () => {
    //if health is full dont allow
    //if below full health but healing would overshoot full health just return full health number
    //if heal has already been used dont allow
    //after clicked end turn and do enemy attack

    if(healed){
      alert('You have already used your heal!')  
    }else if(fighterPokemon.health === fighterPokemonHealth){
      alert('You have full health already!')
    }else if((fighterPokemon.health + (fighterPokemonHealth / 2)) > fighterPokemonHealth ){
      fighterPokemon.health = fighterPokemonHealth
    }else{
      fighterPokemon.health += (fighterPokemonHealth / 2)
      setHealed(true)
    }
  }

  const catchPokemon = () => {
    //this function will run when you win a fight with another pokemon
    dispatch(addNewPokemon(enemyPokemon))
  };

  return (
    <div className="fighting-component">
      <div className="fighting-graphic-container">
        {isFighting ? (
          <>
            <div>
              {
              fighterPokemon && 
              <Pokemon pokemon={fighterPokemon} fighterPokemonHealth={fighterPokemonHealth}/>
              }
            </div>
            <Pokemon pokemon={enemyPokemon} enemyPokemonHealth={enemyPokemonHealth}/>
          </>
        ) : (
          enemyPokemon ? 
          <div className="fighting-enemy-pokemon">
            <h1>A Wild</h1>
            <Pokemon pokemon={enemyPokemon} enemyPokemonHealth={enemyPokemonHealth}/>
            <h1>Has Appeared!</h1>
          </div> : null
        )}
      </div>


      <div className="fighting-UI-container">
          <div className="fighting-container backpack">
            <FightingBackpack isFighting={isFighting} chosenPokemon={fighterPokemon} fighterPokemonHealth={fighterPokemonHealth} clickedPokemon={getClickedBackpackPokemon} />
          </div>

        {isFighting && fighterPokemon && isPlayersTurn ? (
          <div className="fighting-container buttons">
            <button className="fighting-button" onClick={userAttack}>Attack</button>
            <button title="Heal 50%" className="fighting-button" onClick={heal}>Heal</button>
          </div>
        ) : (
          <div className="fighting-container buttons">
            <button disabled className="fighting-button">Attack</button>
            <button disabled className="fighting-button">Heal</button>
          </div>
        )}
        <div className="fighting-container fight-or-flight">
          {isFighting ? (
            <button
              className="fighting-button"
              onClick={() => {
                setIsFighting(false)
                getRandomPokemon()
              }}
            >
              Run Away
            </button>
          ) : (
              enemyPokemon && <button
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
