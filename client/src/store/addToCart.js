import { createSlice } from "@reduxjs/toolkit";

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cart: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      console.log(action.payload);
    },
    removeToCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    addQuantity: (state, action) => {
      const productToUpdate = state.cart.find((product) => product.id === action.payload);
      if (productToUpdate) {
        productToUpdate.quantity = productToUpdate.quantity +1;
        console.log("Updated product");
        console.log(state.cart);
      } else {
        console.log("Product not found");
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    cartTotal: (state, action) => {
      console.log(state.total, Number(action.payload));
      state.total = state.total + Number(action.payload);
      
    },
  },
});

export const addToCart = addToCartSlice.actions.addToCart;
export const removeToCart = addToCartSlice.actions.removeToCart;
export const clearCart = addToCartSlice.actions.clearCart;
export const cartTotal = addToCartSlice.actions.cartTotal;
export const addQuantity = addToCartSlice.actions.addQuantity;
export default addToCartSlice.reducer;
