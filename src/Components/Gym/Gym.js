import Pokemon from "../Pokemon/Pokemon";
import { useSelector } from "react-redux";

function Gym() {
  const ownedPokemon = useSelector((state) => state.backpack.data);

  const uniqueObjects = {};
  const noDuplicatesList = [];
  const duplicatesList = [];
  const maxLevels = [];

  for (const obj of ownedPokemon) {
    const name = obj.name;
    if (!uniqueObjects[name]) {
      // If the name is not already in the tracking object, add it to the result and mark it as seen.
      uniqueObjects[name] = true;
      noDuplicatesList.push(obj);
    } else {
      duplicatesList.push(obj);
    }
    if (obj.level >= 100) {
      maxLevels.push(obj);
    }
  }
  const ownedPokemonMap = ownedPokemon.map((pokemonInfo, i) => {
    return <Pokemon pokemon={pokemonInfo} key={pokemonInfo.pokemon_id} />;
  });


  return (
    <div className="gym-container">
      <div>
        <div>
          <h2>Catch 'em all!!</h2>
        </div>
        <div
          style={{
            width: "100%",
            height: "60px",
            backgroundColor: "#276f78",
            position: "relative",
            borderRadius: "30px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${(noDuplicatesList.length / 100) * 100}%`,
              height: "60px",
              backgroundColor: "#00ea00"
            }}
          >
            <h2
              style={{
                position: "absolute",
                textAlign: "center",
                width: "100%",
                color: "white"
              }}
            >
              You have {noDuplicatesList.length} out of 100 Pokemon
            </h2>
          </div>
        </div>
        <p>Total: {ownedPokemon.length}</p>
        <p>Shiney Pokemon: {maxLevels.length}</p>
        {/* <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <p style={{margin: '0', padding: '0'}}>Sort By:</p>
          <div>
            <button>Level</button>
            <button>Type</button>
            <button>Name A - Z</button>
            <button>Name Z - A</button>
          </div>
        </div> */}
      </div>
      <div className="pokemon-list">{ownedPokemonMap}</div>
    </div>
  );
}

export default Gym;
