import Pokemon from "../Pokemon/Pokemon";
import { useSelector } from "react-redux";

function Gym() {
  // const [ownedPokemon, setOwnedPokemon] = useState([]);
  // const [backpack, setBackpack] = useState([]);
  const ownedPokemon = useSelector((state) => state.backpack.data);

  const uniqueObjects = {};
  const noDuplicatesList = [];
  const duplicatesList = [];

  for (const obj of ownedPokemon) {
    const name = obj.name;
    if (!uniqueObjects[name]) {
      // If the name is not already in the tracking object, add it to the result and mark it as seen.
      uniqueObjects[name] = true;
      noDuplicatesList.push(obj);
    } else {
      duplicatesList.push(obj);
    }
  }

  const ownedPokemonMap = ownedPokemon.map((pokemonInfo, i) => {
    return (
        <Pokemon pokemon={pokemonInfo} key={pokemonInfo.pokemon_id} />
    );
  });

  return (
    <div className="gym-container">
      <div>
        <div style={{display: 'flex', gap: '20px'}}>
          <h2>Catch 'em all!!</h2>
          <h2>
            Duplicates: {duplicatesList.length}
          </h2>
        </div>
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
                textAlign: "center",
                width: "100%"
              }}
            >
              {noDuplicatesList.length} / 1154
            </h2>
          </div>
        </div>
      </div>
      <ol className="pokemon-list">{ownedPokemonMap}</ol>
    </div>
  );
}

export default Gym;
