import './App.css';
import './Fighting/fighting.css'
import './Gym/gym.css'
import './Hospital/hospital.css'
import './Pokemon/pokemon.css'
import './Auth/auth.css'
import Pokemon from './Pokemon/Pokemon'
import Hospital from './Hospital/Hospital'
import Gym from './Gym/Gym'
import Fighting from './Fighting/Fighting'
import Auth from './Auth/Auth'
import {useEffect, useState} from 'react'
import axios from 'axios';

function App() {
  const [page, setPage] = useState('')//current page
  const [pokeArr, setPokeArr] = useState([])//array of pokemon from PokeAPI

  useEffect(() =>{
    axios.get('https://pokeapi.co/api/v2/pokemon/').then((res) => { //get pokemon from pokeAPI
      let customPokemonArr = []; //create new array to push the custom pokemon object to
      let resArr = res.data.results;
      for(let i = 0; i < resArr.length; i++){
        axios.get(`${resArr[i].url}`).then((res) => {
          customPokemonArr[i].url = res.data.sprites.front_default //get the png url of the specific pokemon and assign it to the url in the object
        })
        customPokemonArr.push({
          name: resArr[i].name,
          url: '',
          health: 100,
          damage: 10,
          xp: 0,
          level: 1,
          owner: ''
        })
      }
      setPokeArr(customPokemonArr)
    })
  },[])

  return (
    <div className='master-container font-link'>
      <div className='side-nav-bar'>{/*these buttons are the navigation system that changes state when each button is clicked*/}
        <Auth/>
        <button id='btn' className='font-link' onClick={() => setPage('Gym')}>Gym</button> 
        <button id='btn' className='font-link' onClick={() => setPage('Fighting')}>Fighting</button>
        <button id='btn' className='font-link' onClick={() => setPage('Hospital')}>Hospital</button>
      </div>
      <div className='page-container'> {/*this is where the actual pages display, i pass pokeArr down in props to each one.*/}
        {page === 'Gym' ? <Gym pokemon={pokeArr}/> : null}
        {page === 'Fighting' ? <Fighting pokemon={pokeArr}/> : null}
        {page === 'Hospital' ? <Hospital pokemon={pokeArr}/> : null}
      </div>
    </div>
  );
}

export default App;
