import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    JWT: "",
    userFromJWT: {}
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        saveJWT(state, action) {
            state.JWT = action.payload;
        },
        saveUserFromJWT(state, action) {
            state.userFromJWT = action.payload
        }
    }
});
export const {saveUserFromJWT, saveJWT} = authSlice.actions
export default authSlice.reducer;
