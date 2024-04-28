import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    combos: []
};
export const combosSlice = createSlice({
    name: "combos",
    initialState,
    reducers: {
        changeCombos: (state, action) => {
            state.combos = action.payload;
        },
        addCombos: (state, action) => {
            state.combos = [...state.combos, ...action.payload]
        }
    }
});

export const { changeCombos, addCombos } = combosSlice.actions
export const selectCombos = (state) => state.combos.combos;
export default combosSlice.reducer;