import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
  selectedHotel: {},
  selectedHotelId: 6,
  rooms: [],
  selectedRoom: {},
};
export const hotelTeraSlice = createSlice({
  name: "hotelTera",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload;
    },
    setSelectedHotelId: (state, action) => {
      state.selectedHotelId = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
  },
});

export const {
  setHotels,
  setSelectedHotel,
  setRooms,
  setSelectedRoom,
  setSelectedHotelId,
} = hotelTeraSlice.actions;
export const selectTeraHotels = (state) => state.hotelTera.hotels;
export const selectTeraHotel = (state) => state.hotelTera.selectedHotel;
export const selectTeraRooms = (state) => state.hotelTera.rooms;
export const selectTeraRoom = (state) => state.hotelTera.selectedRoom;
export const selectTeraHotelId = (state) => state.hotelTera.selectedHotelId;

export default hotelTeraSlice.reducer;
