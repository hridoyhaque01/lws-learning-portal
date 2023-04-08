import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: [
    "videos",
    "getVideo",
    "assignments",
    "assignmentMark",
    "quizzes",
    "quizMark",
    "getStudentResult",
  ],
  endpoints: (builder) => ({}),
});
