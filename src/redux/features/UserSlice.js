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
        },
        removeUser(state) {
            state.user = {}
        },
        changeAvatarInSlice(state, action) {
            state.user.avatar = action.payload
        },
    }
});
export const {
    saveUser,
    removeUser,
    changeAvatarInSlice,
} = userSlice.actions
export default userSlice.reducer;
