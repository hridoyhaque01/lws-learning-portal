export const selectQuizType = (state) => {
  return state.quiz?.quizType;
};
export const selectQuizPage = (state) => {
  return state.quiz?.quizPage;
};

export const selectQuiz = (state) => {
  return state.quiz?.quiz;
};

export const selectQuizModal = (state) => {
  return state.quiz?.quizModal;
};
