import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../reducers/auth.slice.js';


export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});