import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});
export default userSlice.reducer;
export const { saveUser, removeUser } = userSlice.actions;
export const selectUser = (state) => state.user;
