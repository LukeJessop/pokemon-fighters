import axios from 'axios'
import { useEffect, useState } from 'react'

function FightingBackpack() {
    const [bpPokemon, setBpPokemon] = useState([])
    useEffect(() => {
        axios
            .get('/api/backpack')
            .then((res) => setBpPokemon(res.data))
            .catch((err) => console.log(err.response.data))
    }, [])
    console.log(bpPokemon)
    const backpackMap = bpPokemon.map((e) => {
        return (
            <div>
                {e.name}
                {e.level}
            </div>
        )
    })
    return(
        <div>
            {backpackMap}
        </div>
    )
}

export default FightingBackpack