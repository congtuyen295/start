import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLogged: false,
    isAdmin: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogged = true;
      state.user = action?.payload?.user;
      state.isAdmin = action?.payload?.isAdmin;
    },
    logOut: (state) => {
      state.isLogged = false;
    },
    getUser: (state, action) => {
      const { user, isAdmin } = action.payload;
      state.user = user;
      state.isAdmin = isAdmin;
    },
    setUser: (state, action) => {
      const  user  = action.payload;
      console.log(user);
      state.user = user;
    },
  },
});

const { reducer, actions } = authSlice;
export const { loginSuccess, getUser, logOut, setUser } = actions;
export default reducer;
