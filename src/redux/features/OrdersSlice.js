import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    orders: []
}

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {
        saveOrders: (state, action) => {
            console.log(state.orders)
            state.orders = action.payload;
        },
    },
});
export const {saveOrders} = ordersSlice.actions
export default ordersSlice.reducer;
