import { apiSlice } from "../api/apiSlice";

export const quizMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizMark: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
      providesTags: ["quizMark"],
    }),
    getQuizMark: builder.query({
      query: ({ userId, videoId }) => ({
        url: `/quizMark?student_id_like=${userId}&video_id_like=${videoId}`,
      }),
      transformResponse: (response) => {
        if (response?.length !== 0) {
          return {
            response,
            quizQiven: true,
          };
        } else {
          return {
            response,
            quizQiven: false,
          };
        }
      },
    }),
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        return [
          "quizMark",
          "getStudentResult",
          { type: "getVideo", id: undefined },
        ];
      },
    }),
    editQuizMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizMark",
                undefined,
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
    deleteQuizMark: builder.mutation({
      query: (id) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllQuizMarkQuery,
  useGetQuizMarkQuery,
  useAddQuizMarkMutation,
  useDeleteQuizMarkMutation,
  useEditQuizMarkMutation,
} = quizMarkApi;
