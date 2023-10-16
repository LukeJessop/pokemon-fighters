import { createSlice } from "@reduxjs/toolkit";
import { fetchStarters } from "./backpackApi";

const initialState = {
  data: [],
  chosen: {},
  loading: false,
  error: null
};

const backpackSlice = createSlice({
  name: "backpack",
  initialState,
  reducers: {
    levelUp(state, action) {
      const { xp, id } = action.payload;
      const newXp = xp + 50;
      const newLevel = Math.floor(newXp / 100);
      const newHealth = Math.floor(1.08 ** newLevel + 100);
      const newDamage = Math.floor(1.06 ** (1.3 * newLevel) + 20);

      let newStats = {
        xp: newXp,
        level: newLevel,
        health: newHealth,
        damage: newDamage
      };
      console.log(newStats);
      state.data = state.data.map((item) => {
        if (item.id === id) {
          item.xp = newStats.xp;
          item.level = newStats.level;
          item.health = newStats.health;
          item.damage = newStats.damage;
        }
        return item;
      });
      state.chosen = state.data.filter((item) => item.id === id)[0];

      // check pokemon id or whatever and make sure you have the right pokemon to update
    },
    chosenPokemon(state, action) {
      state.chosen = action.payload;
    },
    addNewPokemon(state, action) {
      const arr = [];
      arr.push(action.payload);
      arr.push(...state.data);
      state.data = [...arr];
    }
  },
  extraReducers: (builder) => {
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

export const { levelUp, addNewPokemon, healthChange, chosenPokemon } =
  backpackSlice.actions;

export default backpackSlice.reducer;
