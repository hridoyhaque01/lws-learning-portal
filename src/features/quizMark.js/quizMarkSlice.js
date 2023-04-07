import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
  quizAnswers: [],
};

const quizMarkSlice = createSlice({
  name: "quizMarkSlice",
  initialState,
  reducers: {
    loadAllQuizzes: (state, action) => {
      state.quizzes = action.payload?.map((question) => ({
        ...question,
        options: question.options?.map((option) => ({
          id: option.id,
          option: option.option,
          checked: false,
        })),
      }));
    },
    loadOriginalQuizzes: (state, action) => {
      state.quizAnswers = action.payload;
    },
    setAnswer: (state, action) => {
      const question = state.quizzes[action.payload?.questionIndex];
      if (question) {
        const option = question.options[action.payload?.optionIndex];
        if (option) {
          option.checked = action.payload?.value;
        }
      }
    },
  },
});

export default quizMarkSlice.reducer;
export const { loadAllQuizzes, loadOriginalQuizzes, setAnswer } =
  quizMarkSlice.actions;
