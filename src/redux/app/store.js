import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import hotelsReducer from "../features/hotelsSlice";
import flightReducer from "../features/flightSlice";
import customerReducer from "../features/customerSlice";
import bookingReducer from "../features/bookingSlice";
import comboFlightReducer from "../features/comboFlightSlice";
import combosReducer from "../features/combosSlice";

import chartReducer from "../features/chartSlice";
import hotelTeraReducer from "../features/hotelTeraSlice";
import flightTeraReducer from "../features/flightTeraSlice";
import usersApi from "../features/usersApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import hotelsApi from "../features/hotelsApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    modal: modalReducer,
    flight: flightReducer,
    hotels: hotelsReducer,
    customer: customerReducer,
    booking: bookingReducer,
    comboFlight: comboFlightReducer,
    combos: combosReducer,
    chart: chartReducer,
    hotelTera: hotelTeraReducer,
    flightTera: flightTeraReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // getProducts.middleware,
      usersApi.middleware,
      hotelsApi.middleware
    ),
});

export default store;

setupListeners(store.dispatch);
