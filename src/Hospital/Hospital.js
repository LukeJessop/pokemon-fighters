import Pokemon from '../Pokemon/Pokemon'

function Hospital(props){
    return(
        <div>
            this is Hospital
            <Pokemon pokemon={props}/>
        </div>
    )
}

export default Hospital