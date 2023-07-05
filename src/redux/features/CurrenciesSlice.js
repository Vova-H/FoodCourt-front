import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currencies: {"USDPLN": 1, "USDUAH": 1}
}

const currenciesSlice = createSlice({
    name: 'currencies',
    initialState,
    reducers: {
        saveCurrencies: (state, action) => {
            state.currencies = action.payload
        }
    },
});
export const {saveCurrencies} = currenciesSlice.actions
export default currenciesSlice.reducer;
