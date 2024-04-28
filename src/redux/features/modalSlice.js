import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
    subtitle: "Thông báo",
    message: "",
    status:"info",
}
    ;
export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModalSubtitle: (state, action) => {
            state.subtitle = action.payload;
        },
        setModalMessage: (state, action) => {
            state.message = action.payload;
        },
        setModalIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setModalStatus: (state,action) =>{
            state.status = action.payload
        }
    }
})
export default modalSlice.reducer;
export const { setModalSubtitle, setModalMessage, setModalIsOpen, setModalStatus } = modalSlice.actions;
export const selectModal = (state) => state.modal;