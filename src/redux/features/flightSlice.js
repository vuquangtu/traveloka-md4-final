import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  airPortLocations: [],
  seatTypes: [],
  error: null,
  searchParams: {
    fromAirportLocationId: 1,
    toAirportLocationId: 2,
    startDate: new Date(2024,3,7).toISOString().split("T")[0],
    airPlantBrandId: [],
    seatTypeId: 1,
    seatQuantity: 1,
    sortBy: "startTime",
    order: "asc",
    durationFrom: 0,
    durationTo: null,
    priceFrom: 0,
    priceTo: 1000000000,
    page: 0,
  },
  searchResults: [],
  airPlantSearchDTO: [],
  flightDetailsDTO: [],
  flightInForShortDescriptions: [],
  selectToAirPort: null,
  fromAirportLocationName: "Thành phố Hồ Chí Minh - SGN",
  toAirportLocationName: "Thành phố Hà Nội - HAN",
  flightInformation: null,
  seatTypeName: "phổ thông",
  isSearched: false,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    getAirPortLocations: (state, action) => {
      state.airPortLocations = action.payload;
    },
    getSeatType: (state, action) => {
      state.seatTypes = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setFlightInformation: (state, action) => {
      state.flightInformation = action.payload;
    },
    setFlightDetailsDTO: (state, action) => {
      state.flightDetailsDTO = action.payload;
    },
    setAirPlaneSearchDTO: (state, action) => {
      state.airPlantSearchDTO = action.payload;
    },
    setFlightInForShortDescriptions: (state, action) => {
      state.flightInForShortDescriptions = action.payload;
    },
    setFromAirPortLocationName: (state, action) => {
      state.fromAirportLocationName = action.payload;
    },
    setToAirPortLocationName: (state, action) => {
      state.toAirportLocationName = action.payload;
    },
    setSeatTypeName: (state, action) => {
      state.seatTypeName = action.payload;
    },
    updateAirPlaneId: (state, action) => {
      state.searchParams.airPlantBrandId = action.payload;
    },
    updateSearchParams: (state, action) => {
      state.searchParams.fromAirportLocationId =
        action.payload.fromAirportLocationId;
      state.searchParams.toAirportLocationId =
        action.payload.toAirportLocationId;
      state.searchParams.startDate = action.payload.startDate;
      state.searchParams.airPlantBrandId = action.payload.airPlantBrandId; 
    },

    setSearched: (state, action) => {
      state.isSearched = action.payload;
    },
  },
});
export const {
  getAirPortLocations,
  getSeatType,
  setError,
  setSearchParams,
  setSearchResults,
  setFlightInformation,
  setFlightDetailsDTO,
  setAirPlaneSearchDTO,
  setFlightInForShortDescriptions,
  setSelectToAirPort,
  setFromAirPortLocationName,
  setToAirPortLocationName,
  setSeatTypeName,
  updateAirPlaneId,
  updateSearchParams,
  setSearched,
} = flightSlice.actions;

export const selectAirPortLocations = (state) => state.flight.airPortLocations;
export const selectSeatTypes = (state) => state.flight.seatTypes;
export const selectError = (state) => state.flight.error;
export const selectSearchParams = (state) => state.flight.searchParams;
export const selectSearchResults = (state) => state.flight.searchResults;
export const selectFlightInformation = (state) =>
  state.flight.flightInformation;
export const selectFlightDetailsDTO = (state) => state.flight.flightDetailsDTO;
export const selectAirPlaneSearchDTO = (state) =>
  state.flight.airPlantSearchDTO;
export const selectFlightInforShortDescriptions = (state) =>
  state.flight.flightInForShortDescriptions;
export const selectFromAirPortLocationName = (state) =>
  state.flight.fromAirportLocationName;
export const selectToAirPorLocationName = (state) =>
  state.flight.toAirportLocationName;
export const selectSeatTypeName = (state) => state.flight.seatTypeName;
export const selectUpdateAirPlane = (state) =>
  state.flight.searchParams.airPlantBrandId;

export const selectSearched = (state) => state.flight.isSearched;
export default flightSlice.reducer;
