export const selectAuth = (state) => {
  return state.auth?.user?.role;
};

export const selectName = (state) => {
  return state.auth?.user?.name;
};

export const selectId = (state) => {
  return state.auth?.user?.id;
};

export const selectError = (state) => {
  return state.auth?.error;
};
