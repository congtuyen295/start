import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {
    getCategory: (state, action) => {
      const {categories} = action.payload;
      state.categories = [
        ...categories
      ];
    },
  },
});

const { reducer, actions } = categorySlice;
export const { getCategory } = actions;
export default reducer;
