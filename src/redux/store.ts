import {configureStore} from "@reduxjs/toolkit";
import userReducer from './reducers/userReducer';
import clientReducer from './reducers/clientReducer'

export const store =  configureStore({
    reducer: {
        userLogin: userReducer,
        clientReducer: clientReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;