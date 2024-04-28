import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    startDate: new Date(2024, 3, 8).toISOString().split("T")[0],
    fromAirportLocationId: 1,
    fromAirportName: "Sân bay quốc tế Tân Sơn Nhất (SGN) (Thành phố Hồ Chí Minh)",
    toAirportLocationId: 2,
    toAirportName: "Sân bay quốc tế Nội Bài (HAN) (Thành phố Hà Nội)",
    seatQuantity: 1,
    seatTypeId: 1,
    seatTypeName: "phổ thông",
    page: 0,
};
export const comboFlightSlice = createSlice({
    name: "comboFlight",
    initialState,
    reducers: {
        changeComBoFlightId: (state, action) => {
            state.id = action.payload
        },
        changeStartDate: (state, action) => {
            state.startDate = action.payload
        },
        changeFromAirportLocationId: (state, action) => {
            state.fromAirportLocationId = action.payload
        },
        changeFromAirportName: (state, action) => {
            state.fromAirportName = action.payload
        },
        changeToAirportLocationId: (state, action) => {
            state.toAirportLocationId = action.payload
        },
        changeToAirportName: (state, action) => {
            state.toAirportName = action.payload
        },
        changeSeatQuantity: (state, action) => {
            state.seatQuantity = action.payload
        },
        changeSeatTypeId: (state, action) => {
            state.seatTypeId = action.payload
        },
        changeSeatTypeName:(state,action)=>{
            state.seatTypeName = action.payload
        },
        changePage:(state,action)=>{
            state.page = action.payload
        }
    }
});
export const { changePage ,changeSeatTypeName ,changeComBoFlightId, changeFromAirportName, changeFromAirportLocationId, changeSeatQuantity, changeSeatTypeId, changeStartDate, changeToAirportName, changeToAirportLocationId } = comboFlightSlice.actions
export const selectComboFlight = (state) => state.comboFlight;
export default comboFlightSlice.reducer;