import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import assinmentReducer from "../features/assignment/assignmentSlice";
import assignmentMarkReducer from "../features/assignmentmark/assignmentMarkSlice";
import authReducer from "../features/auth/authSlice";
import quizReducer from "../features/quiz/quizSlice";
import quizMarkReducer from "../features/quizMark.js/quizMarkSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    videos: videosReducer,
    assignment: assinmentReducer,
    quiz: quizReducer,
    quizMark: quizMarkReducer,
    assignmentMark: assignmentMarkReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
