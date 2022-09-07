function Pokemon(props){
    const pokeArr = props.pokemon.pokemon.map((e) => {
        return(
            <div key={e.name} style={{backgroundImage: `url(${e.url})`}} className="pokemon-container">
                <h1 className="pokemon-name">{e.name}</h1>
                <div className="pokemon-stats-container">
                    <h2 className="pokemon-lvl">{e.level}</h2>
                    <h5 className="pokemon-health">💛 {e.health}</h5>
                    <h5 className="pokemon-damage">🗡 {e.damage}</h5>
                    <h5>⭐️ {e.xp}</h5>
                </div>
            </div>
        )
    })
return(
    <div className="pokemon-list">
        {pokeArr}
    </div>
)
}

export default Pokemon