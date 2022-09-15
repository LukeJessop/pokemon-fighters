import { useState, useEffect } from "react";
import Pokemon from "../Pokemon/Pokemon";
import axios from "axios";

function Gym() {
  const [ownedPokemon, setOwnedPokemon] = useState([]);
  const [backpackOpen, setBackpackOpen] = useState(false)
  const [backpack, setBackpack] = useState([])
  const [draggedOverElement, setDraggedOverElement] = useState(false);
  const [draggedElement, setDraggedElement] = useState([]);

  useEffect(() => {
    getUserPokemon()
    getBackpack()
  }, []);

  const getUserPokemon = () => {
    axios
    .get("/api/pokemon")
    .then((res) => {
      setOwnedPokemon(res.data);
    })
    .catch((err) => console.log(err.response.data));
  }

  const getBackpack = () => {
    axios
    .get('/api/backpack')
    .then((res) => {
      setBackpack(res.data)
    })
    .catch((err) => console.log(err.response.data))
  }

  const updateBackpack = (pokemonObj) => {
    const {pokemon_id, inBackpack} = pokemonObj
    axios
    .put('/api/backpack', {pokemon_id, inBackpack})
    .then((res) => console.log('went through the .put', res.data))
    .catch((err) => console.log(err.response.data))
  }


  const addToBackpack = (underElement, element) => {
    if(!underElement){
      return
    }
    if(backpack.length >= 6){ //if there are 6 pokemon in bag then trigger alert and exit function
        alert('You can only have 6 Pokemon in your backpack!')
        return
    }
    for(let i = 0; i < backpack.length; i++){// if there is already a pokemon in the bag then alert and exit function
      if (backpack[i] === element){
        alert('This pokemon is already in your backpack!')
        return
      }
    }
      setBackpack([...backpack, element])
      setDraggedOverElement(false)
      setDraggedElement([])
      updateBackpack(element)
      //some code to send backpack to db
  }

  const removeFromBackpack = (underElement, element) => {
    if(underElement){
      alert('you moved this out the backpack')
    }
  }
  const ownedPokemonMap = ownedPokemon.map((e, i) => {
    return(
      <div
      className="pokemon-div"
      draggable="true"
      onDragStart={() => {setDraggedElement(e)}}
      onDragEnd={(e) => {addToBackpack(draggedOverElement, draggedElement)}}
      key={i}
      >
        <Pokemon pokemon={e} key={i}/>
      </div>
    )
  });

  const backpackMap = backpack.map((e,i) => {
    return(
      <div
      className="pokemon-div"
      draggable="true"
      onDragStart={() => {setDraggedElement(e)}}
      onDragOver={(e) => {console.log(e)}} ///THIS IS WHERE YOU LEFT OFF, TRY TO GET THIS TO DISPLAY SOMETHING UNIQUE SO YOU CAN set draggedOverElement to false somehow
      onDragEnd={(e) => {removeFromBackpack(draggedOverElement, draggedElement)}}
      key={i}
      >
        <Pokemon pokemon={e} key={i}/>
      </div>
    )})

  return (
    <div className="gym-container">
      {
        backpackOpen 
        ? 
        <div className="backpack-container">
          <h2>Backpack</h2>
          <div className="backpack-drop-zone" onDragEnter={(e) => {setDraggedOverElement(true)}}>
            <h2>Drag and drop the pokemon you want to take to battle here!</h2>
          </div>
          <div className="backpack-buttons">
            <button className="btn" onClick={() => setBackpackOpen(false)}>close Backpack</button>
          </div>
            <div className="backpack-pokemon">{backpackMap}</div>
        </div>
        :
        <button className="btn" onClick={() => setBackpackOpen(true)}>Open Backpack</button>
      }
      
      <div className="pokemon-list">{ownedPokemonMap}</div>
    </div>
  );
}


export default Gym;
