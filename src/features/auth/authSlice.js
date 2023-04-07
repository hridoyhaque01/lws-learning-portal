import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
  error: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    loginError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { userLoggedIn, userLoggedOut, loginError } = authSlice.actions;
