import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  page: 1,
  video: {},
  videoPlayer: {},
};

const videosSlice = createSlice({
  name: "videosSlice",
  initialState,
  reducers: {
    setVideo: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default videosSlice.reducer;
export const { setVideo } = videosSlice.actions;
