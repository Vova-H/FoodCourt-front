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

        cleanCart: (state) => {
            state.cart = []
        },
    },
});
export const {
    changeQuantityProduct,
    saveCartFromServer,
    cleanCart
} = cartSlice.actions
export default cartSlice.reducer;
