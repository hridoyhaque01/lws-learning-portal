import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizType: "",
  quizPage: 1,
  quiz: {},
  quizModal: false,
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
