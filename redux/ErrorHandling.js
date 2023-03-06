import { isRejectedWithValue } from '@reduxjs/toolkit';

export default (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        // toast.warn({title: 'Async error!', message: action.error.data.message})
    }
    return next(action);
};
