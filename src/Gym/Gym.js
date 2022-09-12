import { useState } from "react";
import Pokemon from "../Pokemon/Pokemon";

function Gym(props) {
  return (
    <div>
      <Pokemon pokemon={props} />
    </div>
  );
}

export default Gym;
