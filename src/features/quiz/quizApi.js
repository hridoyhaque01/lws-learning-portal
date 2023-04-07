import { apiSlice } from "../api/apiSlice";

const quizLimit = process.env.REACT_APP_QUIZ_PER_PAGE;

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: ({ page = 1, limit }) => ({
        url: `/quizzes?_page=${page}&_limit=${limit}`,
      }),
      providesTags: ["quizzes"],
      transformResponse: (response, meta, arg) => {
        const totalQuizzes = Number(meta.response.headers.get("X-Total-Count"));
        const totalPages = Math.ceil(totalQuizzes / arg.limit);
        return {
          response,
          totalQuizzes,
          totalPages,
        };
      },
    }),
    getAllQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes?video_id_like=${id}`,
      }),
    }),
    editQuiz: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ page }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizzes",
                { page, limit: quizLimit },
                (draft) => {
                  const index = draft.response.findIndex(
                    (video) => video.id === data?.id
                  );
                  if (index !== -1) {
                    draft.response[index] = data;
                  }
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["quizzes"],
    }),
    deleteQuiz: builder.mutation({
      query: ({ id, page }) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quizzes"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
  useGetAllQuizQuery,
} = quizApi;
