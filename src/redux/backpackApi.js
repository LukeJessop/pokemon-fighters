import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const getTypes = async (item) => {
  try {
    let res = await axios.get(item.url);
    return res.data.types;
  } catch (err){
    console.log(err)
    return [];
  }
};


export const fetchStarters = createAsyncThunk(
  "backpack/fetchStarters",
  async () => {

    return await axios
    .get(`https://pokeapi.co/api/v2/pokemon`)
    .then(async (res) => {
        let starters = []
        for (let i = 0; i < res.data.results.length; i++) {
            let name = res.data.results[i].name;
            if (
            name === "squirtle" ||
            name === "bulbasaur" ||
            name === "charmander"
            ) {
            let xp = 100;
            let level = xp / 100;
            let health = 1.08 ** level + 100;
            let damage = 1.06 ** (1.3 * level) + 20;
            const types = await getTypes(res.data.results[i])
            starters.push({
                id: i,
                name: res.data.results[i].name,
                health: Math.floor(health),
                damage: Math.floor(damage),
                level: Math.floor(level),
                pokemonUrl: res.data.results[i].url,
                xp: xp,
                inBackpack: false,
                types: types
            })
            return starters
            }
        }})
    .catch((err) => console.log("useEffect() in Fighting component ", err));
  }
);

export default fetchStarters;
