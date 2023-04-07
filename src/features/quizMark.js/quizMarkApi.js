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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          if (data?.data?.id) {
            console.log(JSON.parse(JSON.stringify(data)));

            const { student_id, video_id } = data.data || {};

            console.log(student_id, video_id);

            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMark",
                {
                  id: video_id,
                  userId: student_id,
                },
                (draft) => {
                  console.log(JSON.parse(JSON.stringify(draft)));
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetAllQuizMarkQuery,
  useGetQuizMarkQuery,
  useAddQuizMarkMutation,
} = quizMarkApi;
