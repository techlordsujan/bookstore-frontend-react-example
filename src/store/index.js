import { configureStore } from "@reduxjs/toolkit";

import cartReducer from './slices/slice.cart';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
});

export default store;