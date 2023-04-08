import { apiSlice } from "../api/apiSlice";

const quizLimit = Number(process.env.REACT_APP_QUIZ_PER_PAGE);

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

      async onQueryStarted({ id, page }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // let quiz = {};
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
                    // quiz = { ...quiz, ...draft.response[index] };
                    draft.response[index] = data;
                  }
                }
              )
            );
          }

          // const quizMarks = await dispatch(
          //   quizMarkApi.endpoints.getAllQuizMark.initiate()
          // ).unwrap();

          // if (quizMarks?.length > 0) {
          //   const filteredQuizMarks = quizMarks.filter(
          //     (quizMark) => quizMark?.video_id === quiz?.video_id
          //   );
          //   if (filteredQuizMarks?.length > 0) {
          //     filteredQuizMarks.forEach((filteredQuizMark) => {
          //       const quizMarkId = filteredQuizMark?.id;
          //       const video_id = data?.video_id;
          //       const video_title = data?.video_title;
          //       dispatch(
          //         quizMarkApi.endpoints.editQuizMark.initiate({
          //           id: quizMarkId,
          //           data: { video_id, video_title },
          //         })
          //       );
          //     });
          //   }
          // }
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
      query: (id) => ({
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
