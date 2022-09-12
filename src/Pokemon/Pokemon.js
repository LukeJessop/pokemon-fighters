import { useState } from "react";

function Pokemon(props) {
  const [facingFront, setFacingFront] = useState(true);
  return (
      <div
        key={props.pokemon.name}
        style={{
          backgroundImage: `url(${facingFront ? props.pokemon.frontSprite : props.pokemon.backSprite})`,
        }}
        className="pokemon-container"
        onClick={() =>
          facingFront ? setFacingFront(false) : setFacingFront(true)
        }
      >
        {/*for some reason this creates a bug where every pokemon turns around when just one is clicked on */}
        <h2 className="pokemon-name">{props.pokemon.name}</h2>
        <div className="pokemon-stats-container">
          <h2 className="pokemon-lvl">{props.pokemon.level}</h2>
          <h5 className="pokemon-health">💛 {props.pokemon.health}</h5>
          <h5 className="pokemon-damage">🗡 {props.pokemon.damage}</h5>
          <h5>⭐️ {props.pokemon.xp}</h5>
        </div>
      </div>
  )
}

export default Pokemon;
