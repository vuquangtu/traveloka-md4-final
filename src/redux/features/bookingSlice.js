import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelName: null,
  flightNameFromCity: null,
  flightNameToCity: null,
  totalMoney: null,
  status: null,
  bookingPending: [],
  bookingBooked: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingPending: (state, action) => {
      state.bookingPending = action.payload;
    },
    setBookingBooked: (state, action) => {
      state.bookingBooked = action.payload;
    },
    changeTotalMoney: (state, action) => {
      state.totalMoney = action.payload;
    },
    changeHotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    changeFlightNameFromCity: (state, action) => {
      state.flightNameFromCity = action.payload;
    },
    changeFlightNameToCity: (state, action) => {
      state.flightNameToCity = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  changeHotelName,
  changeFlightNameFromCity,
  changeFlightNameToCity,
  changeTotalMoney,
  changeStatus,
  setBookingPending,
  setBookingBooked,
} = bookingSlice.actions;
export const selectBooking = (state) => state.booking;
export default bookingSlice.reducer;
