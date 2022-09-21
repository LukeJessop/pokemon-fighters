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
    const barStyles = {
        height: 'auto',
        padding: '5x'
    }
    const backpackMap = bpPokemon.map((e) => {
        return (
            <div >
                <div className='backpack-stats'>
                    <div className='backpack-lvl'>
                        {e.level}
                    </div>
                    {e.name}
                    <div className='backpack-bars'>
                        <div style={{backgroundColor: 'green', padding: `${barStyles.margin}`}}>
                            <h6 style={{margin: '0', padding: '3px', color: 'white'}}>{e.health}</h6>
                        </div>
                        <div style={{ backgroundColor: 'grey', padding: `${barStyles.margin}`}}>
                            <div style={{backgroundColor: 'yellow', width: `${ e.xp < 100 ? e.xp : e.xp % 100}%`}} >{e.xp}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return(
        <div className='fight-backpack-container'>
            {backpackMap}
        </div>
    )
}

export default FightingBackpack