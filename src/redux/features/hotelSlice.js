import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  startDate: new Date(2024,3,8).toISOString().split("T")[0],
  nights: 1,
  cityId: 30,
  cityName: "Thành phố Hồ Chí Minh",
  personQuantity: 1,
  roomQuantity: 1,
  moneyFrom: 0,
  moneyTo: 106000000,
  stars: [],
  sort: "booked",
  pageNumber: 0,
};
export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    changeHotelId: (state, action) => {
      state.id = action.payload;
    },
    changeCity: (state, action) => {
      state.cityId = action.payload.id;
      state.cityName = action.payload.name;
    },
    changeStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    changeNights: (state, action) => {
      state.nights = action.payload;
    },
    changePersonQuantity: (state, action) => {
      state.personQuantity = action.payload;
    },
    changeRoomQuantity: (state, action) => {
      state.roomQuantity = action.payload;
    },
    changeMoneyFrom: (state, action) => {
      state.moneyFrom = action.payload;
    },
    changeMoneyTo: (state, action) => {
      state.moneyTo = action.payload;
    },
    addStar: (state, action) => {
      if (!state.stars.includes(action.payload))
        state.stars.push(action.payload);
    },
    removeStar: (state, action) => {
      state.stars = state.stars.filter((star) => star !== action.payload);
    },
    changeSort: (state, action) => {
      state.sort = action.payload;
    },
    changePageNumber: (state, action) => {
      state.pageNumber = action.payload;
    },
  },
});
export const {
  changeHotelId,
  changeCity,
  changeStartDate,
  changeNights,
  changePersonQuantity,
  changeRoomQuantity,
  changeMoneyFrom,
  changeMoneyTo,
  addStar,
  removeStar,
  changeSort,
  changePageNumber,
} = hotelSlice.actions;
export const selectHotel = (state) => state.hotel;
export default hotelSlice.reducer;
