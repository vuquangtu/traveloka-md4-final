import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  airplanes: [],
  selectedAirplane: {},
  selectedAirplaneId: null,
  flightInfos: [],
  selectedFlightInfo: {},
};
export const flightTeraSlice = createSlice({
  name: "flightTera",
  initialState,
  reducers: {
    setAirplanes: (state, action) => {
      state.airplanes = action.payload;
    },
    setSelectedAirplane: (state, action) => {
      state.selectedAirplane = action.payload;
    },
    setSelectedAirplaneId: (state, action) => {
      state.selectedAirplaneId = action.payload;
    },
    setFlights: (state, action) => {
      state.flightInfos = action.payload;
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlightInfo = action.payload;
    },
  },
});

export const {
  setAirplanes,
  setSelectedAirplane,
  setSelectedAirplaneId,
  setFlights,
  setSelectedFlight,
} = flightTeraSlice.actions;
export const selectTeraAirplanes = (state) => state.flightTera.airplanes;
export const selectTeraAirplane = (state) => state.flightTera.selectedAirplane;
export const selectTeraFlights = (state) => state.flightTera.flightInfos;
export const selectTeraFlight = (state) => state.flightTera.selectedFlightInfo;
export const selectTeraAirplaneId = (state) =>
  state.flightTera.selectedAirplaneId;

export default flightTeraSlice.reducer;
