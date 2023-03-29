import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        saveUser(state, action) {
            state.user = action.payload
        }
    }
});
export const {saveUser} = userSlice.actions
export default userSlice.reducer;
