import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(product => product[0].id !== action.payload);
        },
        changeQuantityProduct: (state, action) => { // action.payload.id and q
            state.cart.map(product => {
                if (product[0].id === action.payload.dishId) {
                    product[1] = action.payload.quantity
                }
            })
        },
    },
});
export const {addToCart, removeFromCart, changeQuantityProduct} = cartSlice.actions
export default cartSlice.reducer;
