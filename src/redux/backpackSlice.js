import { createSlice } from "@reduxjs/toolkit";
import { fetchStarters } from "./backpackApi";

const initialState = {
  data: [],
  loading: false,
  error: null
};

const backpackSlice = createSlice({
  name: "backpack",
  initialState,
  reducers: {
    levelUp(state, action) {
      const {xp, level, id} = action.payload
      let newStats = {
        xp: xp + 50,
        level: Math.floor(xp / 100),
        health: Math.floor(1.08**level + 100),
        damage: Math.floor(1.06**(1.3 * level)+ 20),
      }
      
      state.data = state.data.map(item => {
        if(item.id === id){
          item.xp = newStats.xp
          item.level = newStats.level
          item.health = newStats.health
          item.damage = newStats.damage
        }
        return item
      })

      // check pokemon id or whatever and make sure you have the right pokemon to update
    },
    addNewPokemon(state, action) {
      const arr = []
      arr.push(action.payload)
      arr.push(...state.data)
      state.data = [...arr]
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStarters.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStarters.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchStarters.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export const {
  levelUp,
  addNewPokemon,
  healthChange
} = backpackSlice.actions

export default backpackSlice.reducer;


