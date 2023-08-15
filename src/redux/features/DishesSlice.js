import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    dishes: [],
    favoriteDishes: [],
    discount: false
}

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialState,
    reducers: {
        saveDishes: (state, action) => {
            state.dishes = action.payload;
        },
        saveFavoritesDishes: (state, action) => {
            state.favoriteDishes = action.payload
        },
        addFavoriteDish: (state, action) => {
            state.favoriteDishes = [...state.favoriteDishes, action.payload];
        },
        removeFavoriteDish: (state, action) => {
            state.favoriteDishes = state.favoriteDishes.filter(dish => dish.id !== action.payload);
        },
        hideDiscount: (state, action) => {
            state.discount = true
        },
        cancelDiscount: (state, action) => {
            state.discount = false
        }
    },
});
export const {
    saveDishes,
    addFavoriteDish,
    removeFavoriteDish,
    saveFavoritesDishes,
    hideDiscount,
    cancelDiscount
} = dishesSlice.actions
export default dishesSlice.reducer;
