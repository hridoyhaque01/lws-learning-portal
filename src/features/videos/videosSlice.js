import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoType: "",
  videosPage: 1,
  video: {},
  videoPlayer: {},
  videosModal: false,
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
export const { setVideo, controlVideoModal } = videosSlice.actions;
