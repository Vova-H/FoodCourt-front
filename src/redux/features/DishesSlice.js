import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    dishes: [],
    favoriteDishes: []
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
        // addFavoriteDish: (state, action) => {
        //     state.favoriteDishes = [...state.favoriteDishes, action.payload];
        // },
        // removeFavoriteDish: (state, action) => {
        //     state.favoriteDishes.map(dish => {
        //         console.log(dish.name)
        //     })
        //     state.favoriteDishes = state.favoriteDishes.filter(dish => dish.id !== action.payload.id);
        // }
    },
});
export const {saveDishes, addFavoriteDish, removeFavoriteDish, saveFavoritesDishes} = dishesSlice.actions
export default dishesSlice.reducer;
