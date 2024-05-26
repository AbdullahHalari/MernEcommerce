import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: "all",
  price: 0,
  colors: [],
  category: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCompanyFilter: (state, action) => {
      state.company = action.payload;
      console.log(state.company);
    },
    setPriceFilter: (state, action) => {
      state.price = action.payload;
      console.log(state.price);
    },
    setColorFilter: (state, action) => {
      const color = action.payload;
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((c) => c !== color);
        // console.log(state.colors);

      } else {
        state.colors.push(color);
        // console.log(state.colors)
      }
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
      console.log(state.category);
    },
  },
});

export const {
  setCompanyFilter,
  setPriceFilter,
  setColorFilter,
  setCategoryFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
