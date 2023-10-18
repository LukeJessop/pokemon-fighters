import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import FightingBackpack from "./FightingBackpack";
import { useDispatch } from "react-redux";
import { addNewPokemon, levelUp } from "../../redux/backpackSlice";
import { useSelector } from "react-redux";
import { typeMap } from "./typeAdvantage";
import Sword from "../../Assets/attack-icon.svg";
import Heal from "../../Assets/heal.svg";
import Shoe from "../../Assets/shoe.svg";
import Glove from "../../Assets/boxing-glove.svg";

function Fighting() {
  const dispatch = useDispatch();
  const [pokeArr, setPokeArr] = useState([]);

  const [enemy, setEnemy] = useState();
  const [enemyHealth, setEnemyHealth] = useState();
  const [enemyAdvantage, setEnemyAdvantage] = useState(false);
  const [enemyDisadvantage, setEnemyDisadvantage] = useState(false);

  const [player, setPlayer] = useState();
  const [playerHealth, setPlayerHealth] = useState();
  const [playerAdvantage, setPlayerAdvantage] = useState(false);
  const [playerDisadvantage, setPlayerDisadvantage] = useState(false);

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
    let randomNum = Math.floor(Math.random() * 100);
    setEnemy(pokeArr[randomNum]);
    setEnemyHealth(pokeArr[randomNum].health);
  };

  const getTypes = useCallback(async (item) => {
    try {
      let res = await axios.get(item.url);
      return res.data.types;
    } catch (err) {
      console.log(err);
      return [];
    }
  }, []);

  useEffect(() => {
    if (!pokeArr.length) {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100") //get all pokemon and store them in pokeArr
        .then(async (res) => {
          let pokemonArr = res.data.results;
          for (let i = 0; i < pokemonArr.length; i++) {
            let xp = Math.floor(Math.random() * 10000);
            let level = xp / 100;
            let health = 1 * level + 100;
            let damage = 0.7 * level + 10;
            const types = await getTypes(pokemonArr[i]);
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
                inBackpack: false,
                types: types
              }
            ]);
          }
        })
        .catch((err) => console.log("useEffect() in Fighting component ", err));
    }
  }, [pokeArr, getTypes]);

  useEffect(() => {
    if (!isFighting) {
      // if fighting mode is not true
      const interval = setInterval(() => {
        // cycle through the pokeAPI array and display each one every 5 seconds
        let randomNum = Math.floor(Math.random() * 100);
        setEnemy(pokeArr[randomNum]);
        setEnemyHealth(pokeArr[randomNum].health);
      }, 5000);

      return () => clearInterval(interval); //cleanup interval function
    }
  }, [isPokeArrEmpty, isFighting, pokeArr]);

  const calcUserTypeAdvantage = () => {
    let advantage = false;
    let disadvantage = false;
    let advantagePoints = 0;
    let disadvantagePoints = 0;

    for (let i = 0; i < player.types.length; i++) {
      for (let j = 0; j < typeMap.length; j++) {
        if (player.types[i].type.name === typeMap[j].type.toLowerCase()) {
          for (let s = 0; s < enemy.types.length; s++) {
            for (let t = 0; t < typeMap[j].strengths.length; t++) {
              if (
                enemy.types[s].type.name.toLowerCase() ===
                typeMap[j].strengths[t].type.toLowerCase()
              ) {
                advantagePoints++;
              }
            }
            for (let t = 0; t < typeMap[j].weaknesses.length; t++) {
              if (
                enemy.types[s].type.name.toLowerCase() ===
                typeMap[j].weaknesses[t].type.toLowerCase()
              ) {
                disadvantagePoints++;
              }
            }
          }
        }
      }
    }
    advantage = advantagePoints > disadvantagePoints;
    disadvantage = disadvantagePoints > advantagePoints;
    setPlayerAdvantage(advantage);
    setPlayerDisadvantage(disadvantage);
  };

  const playerDamage = () => {
    if (playerAdvantage) {
      enemy.health -= player.damage * 2;
    } else if (playerDisadvantage) {
      enemy.health -= player.damage / 2;
    } else {
      enemy.health -= player.damage;
    }
  };

  const calcEnemyTypeAdvantage = () => {
    let advantage = false;
    let disadvantage = false;
    let advantagePoints = 0;
    let disadvantagePoints = 0;

    for (let i = 0; i < enemy.types.length; i++) {
      for (let j = 0; j < typeMap.length; j++) {
        if (enemy.types[i].type.name === typeMap[j].type.toLowerCase()) {
          for (let s = 0; s < player.types.length; s++) {
            for (let t = 0; t < typeMap[j].strengths.length; t++) {
              if (
                player.types[s].type.name.toLowerCase() ===
                typeMap[j].strengths[t].type.toLowerCase()
              ) {
                advantagePoints++;
              }
            }
            for (let t = 0; t < typeMap[j].weaknesses.length; t++) {
              if (
                player.types[s].type.name.toLowerCase() ===
                typeMap[j].weaknesses[t].type.toLowerCase()
              ) {
                disadvantagePoints++;
              }
            }
          }
        }
      }
    }
    advantage = advantagePoints > disadvantagePoints;
    disadvantage = disadvantagePoints > advantagePoints;
    setEnemyAdvantage(advantage);
    setEnemyDisadvantage(disadvantage);
  };

  const enemyDamage = () => {
    if (enemyAdvantage) {
      player.health -= enemy.damage * 2;
    } else if (enemyDisadvantage) {
      player.health -= enemy.damage / 2;
    } else {
      player.health -= enemy.damage;
    }
  };

  const enemyAttack = () => {
    const adv = player.health - enemy.damage * 2;
    const disAdv = player.health - enemy.damage / 2;
    const reg = player.health - enemy.damage;
    let damageType;

    if (enemyAdvantage) {
      damageType = "adv";
    } else if (enemyAdvantage) {
      damageType = "disadv";
    } else {
      damageType = "reg";
    }

    const damageAction = (damageToHealth) => {
      setTimeout(() => {
        if (damageToHealth > 0) {
          enemyDamage();
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

    if (damageType === "adv") {
      damageAction(adv);
    } else if (damageType === "disAdv") {
      damageAction(disAdv);
    } else {
      damageAction(reg);
    }
  };

  const userAttack = () => {
    const adv = enemy.health - player.damage * 2;
    const disAdv = enemy.health - player.damage / 2;
    const reg = enemy.health - player.damage;
    let damageType;

    if (playerAdvantage) {
      damageType = "adv";
    } else if (playerDisadvantage) {
      damageType = "disadv";
    } else {
      damageType = "reg";
    }

    const damageAction = (damageToHealth) => {
      if (damageToHealth > 0) {
        playerDamage();
        setIsPlayersTurn(false); //end turn and go to enemy's turn
      } else {
        alert(
          "You won! You have caught this pokemon, and your pokemon increases in skill!"
        );
        enemy.health = enemyHealth; //reset health of pokemon
        player.health = playerHealth;
        catchPokemon();
        getRandomPokemon();
        dispatch(levelUp({ player, enemy }));
        setIsFighting(false); //the rest of this function resets to base values
        setHealed(false);
        setIsPlayersTurn(true);
        setHealthPack((prev) => (prev += 1));
        return; // end function
      }
      enemyAttack();
    };

    if (damageType === "adv") {
      damageAction(adv);
    } else if (damageType === "disAdv") {
      damageAction(disAdv);
    } else {
      damageAction(reg);
    }
  };

  const heal = () => {
    //if health is full dont allow
    //if below full health but healing would overshoot full health just return full health number
    //if heal has already been used dont allow
    //after clicked end turn and do enemy attack

    if (healthPack > 0 && !healed) {
      if (player.health === playerHealth) {
        alert("You have full health already!");
      } else if (player.health + playerHealth / 2 > playerHealth) {
        player.health = playerHealth;
        setHealthPack((prev) => prev-- >= 0 && prev--);
      } else {
        player.health += playerHealth / 2;
        setHealthPack((prev) => prev-- >= 0 && prev--);
      }
      if (healthPack === 0) {
        setHealed(true);
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
                <Pokemon
                  advantage={playerAdvantage}
                  disadvantage={playerDisadvantage}
                  pokemon={player}
                  playerHealth={playerHealth}
                />
              )}
            </div>
            <Pokemon
              advantage={enemyAdvantage}
              disadvantage={enemyDisadvantage}
              pokemon={enemy}
              enemyHealth={enemyHealth}
            />
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
            healthPack={healthPack}
            // clickedPokemon={getClickedBackpackPokemon}
          />
        </div>

        <div className="fighting-container buttons">
          {isFighting && player && isPlayersTurn ? (
            <div className="attack-heal-container">
              <button
                className="fighting-button attack-button"
                onClick={userAttack}
              >
                <img alt="attacking" src={Sword} />
              </button>
              <button
                className="fighting-button heal-button"
                onClick={!healed && heal}
              >
                <img alt="healing" src={Heal} />
              </button>
            </div>
          ) : (
            <div className="attack-heal-container">
              <button disabled className="fighting-button attack-button">
                <img alt="attacking" src={Sword} />
              </button>
              <button disabled className="fighting-button heal-button">
                <img alt="healing" src={Heal} />
              </button>
            </div>
          )}
          {isFighting ? (
            <button
              className="fighting-button fight-or-flight"
              onClick={() => {
                setIsFighting(false);
                getRandomPokemon();
                runAway();
              }}
            >
              <img alt="healing" src={Shoe} />
            </button>
          ) : enemy ? (
            <button
              className="fighting-button fight-or-flight"
              onClick={() => {
                setIsFighting(true);
                calcUserTypeAdvantage();
                calcEnemyTypeAdvantage();
              }}
            >
              <img alt="healing" src={Glove} />
            </button>
          ) : (
            <button
              disabled
              className="fighting-button fight-or-flight"
              onClick={() => {
                setIsFighting(true);
                calcUserTypeAdvantage();
                calcEnemyTypeAdvantage();
              }}
            >
              <img alt="healing" src={Glove} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fighting;
