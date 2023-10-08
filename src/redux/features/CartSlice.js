import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        changeQuantityProduct: (state, action) => {
            state.cart.map(product => {
                if (product[0].id === action.payload.dishId) {
                    product[1] = action.payload.quantity
                }
            })
        },

        saveCartFromServer: (state, action) => {
            state.cart = action.payload
        },
    },
});
export const {
    changeQuantityProduct,
    saveCartFromServer
} = cartSlice.actions
export default cartSlice.reducer;
