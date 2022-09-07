import { useState } from 'react'
import Pokemon from '../Pokemon/Pokemon'

function Gym(props){
return(
    <div>
        gym
        <Pokemon pokemon={props}/>
    </div>
)
}

export default Gym