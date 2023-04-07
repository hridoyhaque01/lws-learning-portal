export const selectVideoType = (state) => {
  return state.videos?.videoType;
};
export const selectVideosPage = (state) => {
  return state.videos?.videosPage;
};

export const selectPlayerVideo = (state) => {
  return state.videos?.videoPlayer;
};

export const selectVideo = (state) => {
  return state.videos?.video;
};

export const selectVideosModal = (state) => {
  return state.videos?.videosModal;
};
