import { configureStore } from "@reduxjs/toolkit";
import  addToCartReducer  from "./addToCart";
import filterReducer from "./filter"
export default configureStore({
  reducer: {
    addCart: addToCartReducer,
    filter: filterReducer,
  },
});