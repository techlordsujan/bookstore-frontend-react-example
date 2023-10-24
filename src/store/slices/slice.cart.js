import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
}

const reducers = {
    UPDATE_CART: (state, action) => {
        state.cart = action.payload;
    }
}

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers,
});

export const { UPDATE_CART } = slice.actions;

export default slice.reducer;