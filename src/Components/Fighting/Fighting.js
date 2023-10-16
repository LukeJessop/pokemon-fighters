import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import FightingBackpack from "./FightingBackpack";
import { useDispatch } from "react-redux";
import { addNewPokemon, levelUp } from "../../redux/backpackSlice";
import { useSelector } from "react-redux";

function Fighting() {
  const dispatch = useDispatch();
  const [pokeArr, setPokeArr] = useState([]);

  const [enemy, setEnemy] = useState();
  const [enemyHealth, setEnemyHealth] = useState();
  const [player, setPlayer] = useState();
  const [playerHealth, setPlayerHealth] = useState();

  const [isFighting, setIsFighting] = useState(false);
  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [healthPack, setHealthPack] = useState(1);
  const [healed, setHealed] = useState(false);

  let isPokeArrEmpty = pokeArr.length > 0;

  const chosenPokemon = useSelector((state) => state.backpack.chosen);

  useEffect(() => {
    const mutable = { ...chosenPokemon };
    setPlayer(mutable);
    setPlayerHealth(mutable.health);
  }, [chosenPokemon]);

  const getRandomPokemon = () => {
    let randomNum = Math.floor(Math.random() * 1154);
    setEnemy(pokeArr[randomNum]);
    setEnemyHealth(pokeArr[randomNum].health);
  };

  useEffect(() => {
    if (!pokeArr.length) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1154") //get all pokemon and store them in pokeArr
        .then((res) => {
          let pokemonArr = res.data.results;
          for (let i = 0; i < pokemonArr.length; i++) {
            let xp = Math.floor(Math.random() * 10000);
            let level = xp / 100;
            let health = 1 * level + 100;
            let damage = 0.7 * level + 10;
            setPokeArr((e) => [
              ...e,
              {
                id: i,
                name: pokemonArr[i].name,
                pokemonUrl: pokemonArr[i].url,
                xp: xp,
                level: Math.floor(level),
                health: Math.floor(health),
                damage: Math.floor(damage),
                owner: 0,
                inBackpack: false
              }
            ]);
          }
        })
        .catch((err) => console.log("useEffect() in Fighting component ", err));
    }
  }, [pokeArr]);

  useEffect(() => {
    if (!isFighting) {
      // if fighting mode is not true
      const interval = setInterval(() => {
        // cycle through the pokeAPI array and display each one every 5 seconds
        let randomNum = Math.floor(Math.random() * 1154);
        setEnemy(pokeArr[randomNum]);
        setEnemyHealth(pokeArr[randomNum].health);
      }, 5000);

      return () => clearInterval(interval); //cleanup interval function
    }
  }, [isPokeArrEmpty, isFighting, pokeArr]);

  const getClickedBackpackPokemon = () => {
    setPlayerHealth(player.health); //sets the health of the player
  };

  const enemyAttack = () => {
    setTimeout(() => {
      if (player.health - enemy.damage > 0) {
        player.health -= enemy.damage;
        setIsPlayersTurn(true);
      } else {
        alert("You lost! Don't worry, your pokemon made it to safety.");
        player.health = playerHealth;
        setIsFighting(false);
        setHealed(false);
        setIsPlayersTurn(true);
        getRandomPokemon();
      }
    }, 1000);
  };

  const userAttack = () => {
    if (enemy.health - player.damage > 0) {
      enemy.health -= player.damage; //set enemy.health -= damage
      setIsPlayersTurn(false); //end turn and go to enemy's turn
    } else {
      alert(
        "You won! You have caught this pokemon, and your pokemon increases in skill!"
      );
      enemy.health = enemyHealth; //reset health of pokemon
      player.health = playerHealth;
      catchPokemon();
      getRandomPokemon();
      dispatch(levelUp(player));
      setIsFighting(false); //the rest of this function resets to base values
      setHealed(false);
      setIsPlayersTurn(true);
      setHealthPack((prev) => (prev += 1));
      return; // end function
    }
    enemyAttack();
  };

  const heal = () => {
    //if health is full dont allow
    //if below full health but healing would overshoot full health just return full health number
    //if heal has already been used dont allow
    //after clicked end turn and do enemy attack

    if (healthPack > 0 && !healed) {
      setHealed(true);
      if (player.health === playerHealth) {
        alert("You have full health already!");
      } else if (player.health + playerHealth / 2 > playerHealth) {
        player.health = playerHealth;
        setHealthPack((prev) => prev-- >= 0 && prev--);
      } else {
        player.health += playerHealth / 2;
        setHealthPack((prev) => prev-- >= 0 && prev--);
      }
    }
  };

  const runAway = () => {
    enemy.health = enemyHealth; //reset health of pokemon
    player.health = playerHealth;
    setHealed(false);
    if (healthPack === 0) {
      setHealthPack(1);
    }
  };

  const catchPokemon = () => {
    //this function will run when you win a fight with another pokemon
    dispatch(addNewPokemon(enemy));
  };

  return (
    <div className="fighting-component">
      <div className="fighting-graphic-container">
        {isFighting ? (
          <>
            <div>
              {player && (
                <Pokemon pokemon={player} playerHealth={playerHealth} />
              )}
            </div>
            <Pokemon pokemon={enemy} enemyHealth={enemyHealth} />
          </>
        ) : enemy ? (
          <div className="fighting-enemy-pokemon">
            <h1>A Wild</h1>
            <Pokemon pokemon={enemy} enemyHealth={enemyHealth} />
            <h1>Has Appeared!</h1>
          </div>
        ) : null}
      </div>

      <div className="fighting-UI-container">
        <div className="fighting-container backpack">
          <FightingBackpack
            isFighting={isFighting}
            chosenPokemon={player}
            playerHealth={playerHealth}
            clickedPokemon={getClickedBackpackPokemon}
          />
        </div>

        <div className="fighting-container buttons">
          {isFighting && player && isPlayersTurn ? (
            <>
              <button className="fighting-button" onClick={userAttack}>
                Attack
              </button>
              <button
                title="Heal 50%"
                className="fighting-button"
                onClick={!healed && heal}
              >
                Use Health Pack: {healthPack}
              </button>
            </>
          ) : (
            <>
              <button disabled className="fighting-button">
                Attack
              </button>
              <button disabled className="fighting-button">
                Use Health Pack: {healthPack}
              </button>
            </>
          )}
        </div>

        <div className="fighting-container fight-or-flight">
          {isFighting ? (
            <button
              className="fighting-button"
              onClick={() => {
                setIsFighting(false);
                getRandomPokemon();
                runAway();
              }}
            >
              Run Away
            </button>
          ) : (
            enemy && (
              <button
                className="fighting-button"
                onClick={() => setIsFighting(true)}
              >
                Fight
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Fighting;
