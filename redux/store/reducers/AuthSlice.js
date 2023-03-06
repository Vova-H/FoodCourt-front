import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    JWT: "",
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        saveJWT(state, action) {
            state.JWT = action.payload;
        }
    }
});

export default authSlice.reducer;
