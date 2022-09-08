import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    isLoading: false,
    error: false,
  },
  reducers: {
    addCart: (state, action) => {
      const { cart } = state;
      const { product, quantity } = action.payload;
      const check = cart.every((c) => c.product._id !== product._id);
      if (check) {
        cart.push({ product, quantity });
      } else {
        let index;
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].product._id === product._id) {
            index = i;
            break;
          }
        }
        cart[index].quantity += quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    },
    deleteCart: (state, action) => {
      const { cart } = state;
      const index = action.payload;
      const indexState = cart.findIndex(
        (product, indexCart) => indexCart === index
      );
      if (indexState !== -1) {
        cart.splice(indexState, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    deleteAllCarts: (state, action) => {
      const { cart } = state;
      cart.splice(0)
      localStorage.setItem("cart",JSON.stringify(cart));
    },
    updateCart: (state, action) => {
      const { cart } = state;
      const { index, quantity } = action.payload;
      const indexState = cart.findIndex(
        (product, indexCart) => indexCart === index
      );
      if (indexState !== -1) {
        cart[indexState].quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    },
  },
});
const { reducer, actions } = cartSlice;
export const { addCart, updateCart, deleteCart, deleteAllCarts } = actions;
export default reducer;
