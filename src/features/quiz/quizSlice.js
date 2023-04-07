import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  page: 1,
  quiz: {},
};

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export default quizSlice.reducer;
export const { setQuiz } = quizSlice.actions;
