import { useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import { useSelector } from "react-redux";

function Gym() {
  // const [ownedPokemon, setOwnedPokemon] = useState([]);
  // const [backpack, setBackpack] = useState([]);
  const ownedPokemon = useSelector((state) => state.backpack.data);

  const noDuplicatesList = [...new Set(ownedPokemon)]
  useEffect(() => {
    // getUserPokemon();
    // getBackpack();
  }, []);

  // const getUserPokemon = () => {
  //   axios
  //     .get("/api/pokemon")
  //     .then((res) => {
  //       setOwnedPokemon(res.data);
  //     })
  //     .catch((err) => console.log(err.response.data));
  // };

  // const getBackpack = () => {
  //   axios
  //     .get("/api/backpack")
  //     .then((res) => {
  //       setBackpack(res.data);
  //     })
  //     .catch((err) => console.log(err.response.data));
  // };

  // const updateBackpack = (pokemonObj) => {
  //   const { pokemon_id, inbackpack } = pokemonObj;
  //   axios
  //     .put("/api/backpack", { pokemon_id, inbackpack })
  //     .then(() => {
  //       // getBackpack();
  //     })

  //     .catch((err) => console.log(err.response.data));
  // };

  // const addToBackpack = (element) => {
  //   if (backpack.length >= 6) {
  //     //if there are 6 pokemon in bag then trigger alert and exit function
  //     alert("You can only have 6 Pokemon in your backpack!");
  //     return;
  //   }
  //   for (let i = 0; i < backpack.length; i++) {
  //     // if there is already a pokemon in the bag then alert and exit function
  //     if (backpack[i] === element) {
  //       alert("This pokemon is already in your backpack!");
  //       return;
  //     }
  //   }
  //   // setBackpack((currentBackpack)=>[...currentBackpack, element]);
  //   updateBackpack(element);
  // };

  const ownedPokemonMap = ownedPokemon.map((pokemonInfo, i) => {
    return (
      <div className="pokemon-div" key={pokemonInfo.pokemon_id}>
        <Pokemon pokemon={pokemonInfo} key={pokemonInfo.pokemon_id} />
      </div>
    );
  });

  return (
    <div className="gym-container">
      <div>
        <h2>Catch 'em all!!</h2>
        <div
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "#276f78",
            position: "relative"
          }}
        >
          <div
            style={{
              width: `${(noDuplicatesList.length / 1154) * 100}%`,
              height: "60px",
              backgroundColor: "#00ea00"
            }}
          >
            <h2
              style={{
                position: "absolute",
                textAlign: 'center',
                width: '100%'
              }}
            >
              {noDuplicatesList.length} / 1154
            </h2>
          </div>
        </div>
      </div>
      <div className="pokemon-list">{ownedPokemonMap}</div>
    </div>
  );
}

export default Gym;
