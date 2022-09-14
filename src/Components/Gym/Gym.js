import { useState, useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import {connect } from 'react-redux'
import axios from 'axios'

function Gym(props) {
  const [ownedPokemon, setOwnedPokemon] = useState([])
  useEffect(() => {

    axios
    .get('/api/pokemon')
    .then((res) => {
        setOwnedPokemon(res.data)
        console.log(res.data) //this is where you stopped today!! For some reason, setOwnedPokemon(res.data) isnt actually setting the data to the array. Id say stop here and watch the udemy more so you can get a larger understanding when running into these errors.
    })
    .catch((err) => console.log(err.response.data))


  },[])



  return (
    <div>
      <h1>Your Pokemon</h1>
      <Pokemon pokemon={ownedPokemon}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state
};

export default connect(mapStateToProps)(Gym);
