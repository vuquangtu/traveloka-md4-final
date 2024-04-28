import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: null,
  name: null,
  gender: null,
  date: null,
  month: null,
  year: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    changeCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeGender: (state, action) => {
      state.gender = action.payload;
    },
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    changeMonth: (state, action) => {
      state.month = action.payload;
    },
    changeYear: (state, action) => {
      state.year = action.payload;
    },
    getCustomer: (state, action) => {
      state.customerId = action.payload.customerId;
      state.name = action.payload.name;
      state.gender = action.payload.gender;
      state.date = action.payload.date;
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
    removeUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const {
  changeCustomerId,
  changeName,
  changeGender,
  changeDate,
  changeMonth,
  changeYear,
  getCustomer,
} = customerSlice.actions;

export const selectCustomer = (state) => state.customer;

export default customerSlice.reducer;
