import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authAdminSlice = createSlice({
  name: "authAdminSlice",
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
  },
});

export default authAdminSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authAdminSlice.actions;
