import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isOpen: false,
    content: {}
}

const orderModalSlice = createSlice({
    name: 'OrderModalSlice',
    initialState: initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },

        closeModal: (state) => {
            state.isOpen = false;
        },

        loadContent: (state, action) => {
            state.content = action.payload
        }
    },
});
export const {openModal, closeModal, loadContent} = orderModalSlice.actions
export default orderModalSlice.reducer;
