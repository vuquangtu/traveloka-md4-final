import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  request: {
    id: null,
    type: null,
    quantity: null,
  },
  name: null,
  list: null,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.request.id = action.payload;
    },
    setType: (state, action) => {
      state.request.type = action.payload;
    },
    setQuantity: (state, action) => {
      state.request.quantity = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setId, setType, setQuantity, setName, setList } = chartSlice.actions;
export const selectRequest = (state) => state.request;
export const selectName = (state) => state.name;
export const selectList = (state) => state.list;
export default chartSlice.reducer;
