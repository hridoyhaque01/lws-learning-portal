export const selectQuizzes = (state) => {
  return state.quizMark?.quizzes;
};

export const selectAnswers = (state) => {
  return state.quizMark?.quizAnswers;
};
