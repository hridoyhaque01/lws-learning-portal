import { apiSlice } from "../api/apiSlice";

const videoLimit = Number(process.env.REACT_APP_VIDEOS_PER_PAGE);

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: ({ page = 1, limit }) => ({
        url: `/videos?_page=${page}&_sort=createdAt&_limit=${limit}`,
      }),
      providesTags: ["videos"],
      transformResponse: (response, meta) => {
        const totalVideos = Number(meta.response.headers.get("X-Total-Count"));
        const totalPages = Math.ceil(
          totalVideos / process.env.REACT_APP_VIDEOS_PER_PAGE
        );
        return {
          response,
          totalVideos,
          totalPages,
        };
      },
    }),
    getMoreVideos: builder.query({
      query: (page) => ({
        url: `/videos?_page=${page}&_sort=createdAt&_limit=${process.env.REACT_APP_VIDEOS_PER_PAGE}`,
      }),
      providesTags: ["videos"],
      async onQueryStarted(page, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          if (data?.data.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                return {
                  response: [...draft.response, ...data.data],
                  totalVideos: Number(draft.totalVideos),
                  totalPages: Number(draft.totalPages),
                };
              })
            );
          }
        } catch (err) {}
      },
    }),
    getPlayerVideo: builder.query({
      query: () => ({
        url: "/videos/",
      }),
    }),
    getVideo: builder.query({
      queryFn: async (
        args,
        { signal, dispatch, getState },
        extraOptions,
        baseQuery
      ) => {
        const { data: video } = await baseQuery(`/videos/${args.id}`);
        const { data: assignment } = await baseQuery(
          `/assignments?video_id_like=${args.id}`
        );

        const { data: quizData } = await baseQuery(
          `/quizzes?video_id_like=${args.id}`
        );

        const { data: quizSubmitData } = await baseQuery(
          `/quizMark?video_id_like=${args.id}&student_id=${args.userId}`
        );

        const { data: assignmentData } = await baseQuery(
          `/assignmentMark?assignment_id_like=${assignment?.[0]?.id}&student_id_like=${args.userId}`
        );

        const quizSubmit = quizSubmitData?.length > 0;
        const assignmentSubmit = assignmentData?.length > 0;

        const data = {
          video,
          assignment,
          quizData,
          quizSubmit,
          assignmentSubmit,
        };

        return { data };
      },
    }),
    getAssignmentVideos: builder.query({
      queryFn: async (
        args,
        { signal, dispatch, getState },
        extraOptions,
        baseQuery
      ) => {
        const { data: videos } = await baseQuery(`/videos`);
        const { data: assignments } = await baseQuery(`/assignments`);

        const filterVideos = videos.filter((video) =>
          assignments.every((assignment) => video.id !== assignment?.video_id)
        );

        const data = {
          videos: filterVideos,
        };

        return { data };
      },
      providesTags: ["getAssignmentVideos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ page }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getVideos",
                { page, limit: videoLimit },
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
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos", "getAssignmentVideos"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetMoreVideosQuery,
  useEditVideoMutation,
  useAddVideoMutation,
  useDeleteVideoMutation,
  useGetPlayerVideoQuery,
  useGetAssignmentVideosQuery,
  useGetVideoQuery,
} = videosApi;
