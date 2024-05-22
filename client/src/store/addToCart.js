import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      console.log(action.payload);
    },
    removeToCart: (state, action) => {
      state.cart = state.cart.filter((item)=>item.id !== action.payload.id)
    },
  },
});

export const addToCart = addToCartSlice.actions.addToCart;
export const removeToCart = addToCartSlice.actions.removeToCart;
export default addToCartSlice.reducer;