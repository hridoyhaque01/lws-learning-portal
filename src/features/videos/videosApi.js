import { apiSlice } from "../api/apiSlice";
import { assignmentApi } from "../assignment/assignmentApi";
import { quizApi } from "../quiz/quizApi";
import { quizMarkApi } from "../quizMark/quizMarkApi";

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
      providesTags: (result, error, { id, userId }) => {
        return [{ type: "getVideo", id: `${userId}-${id}` }];
      },
    }),
    getAssignmentVideos: builder.query({
      queryFn: async (
        id,
        { signal, dispatch, getState },
        extraOptions,
        baseQuery
      ) => {
        const { data: videos } = await baseQuery(`/videos`);
        const { data: assignments } = await baseQuery(`/assignments`);

        if (id !== undefined) {
          const findAssignmentVideo = videos.find((video) => video?.id === id);

          const filterVideos = videos.filter((video) =>
            assignments.every((assignment) => video.id !== assignment?.video_id)
          );
          const combineVideos = [{ ...findAssignmentVideo }, ...filterVideos];

          return { data: combineVideos };
        } else {
          const filterVideos = videos.filter((video) =>
            assignments.every((assignment) => video.id !== assignment?.video_id)
          );
          return { data: filterVideos };
        }
      },
      providesTags: (result, error, id) => [
        { type: "getAssignmentVideos", id },
      ],
    }),
    editVideo: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ page, id }, { queryFulfilled, dispatch }) {
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

          //get all response

          const { response: assignments } = await dispatch(
            assignmentApi.endpoints.getAssignments.initiate({})
          ).unwrap();

          const { response: quizzes } = await dispatch(
            quizApi.endpoints.getQuizzes.initiate({})
          ).unwrap();

          const quizMarks = await dispatch(
            quizMarkApi.endpoints.getAllQuizMark.initiate()
          ).unwrap();

          //update assignment details

          if (assignments?.length > 0) {
            const findAssignment = assignments.find(
              (assignment) => assignment?.video_id === id
            );

            if (findAssignment) {
              const assignmentId = Number(findAssignment.id);
              const video_title = data?.title;
              dispatch(
                assignmentApi.endpoints.editAssignment.initiate({
                  id: assignmentId,
                  data: { video_title },
                  page,
                })
              );
            }
          }

          // update  quiz video details

          if (quizzes?.length > 0) {
            const videoRelatedQuizzes = quizzes.filter(
              (quiz) => quiz?.video_id === id
            );
            if (videoRelatedQuizzes?.length > 0) {
              videoRelatedQuizzes.forEach((videoQuiz) => {
                const id = videoQuiz?.id;
                const video_title = data?.title;
                dispatch(
                  quizApi.endpoints.editQuiz.initiate({
                    id,
                    data: { video_title },
                    page: undefined,
                  })
                );
              });
            }
          }

          // update quiz mark video details

          if (quizMarks?.length > 0) {
            const videoRelatedQuizMarks = quizMarks.filter(
              (quiz) => quiz?.video_id === id
            );
            if (videoRelatedQuizMarks?.length > 0) {
              videoRelatedQuizMarks.forEach((videoQuiz) => {
                const id = videoQuiz?.id;
                const video_title = data?.title;
                dispatch(
                  quizMarkApi.endpoints.editQuizMark.initiate({
                    id,
                    data: { video_title },
                  })
                );
              });
            }
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
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "getAssignmentVideos", id: undefined },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // get all required api response

          const { response: assignments } = await dispatch(
            assignmentApi.endpoints.getAssignments.initiate({})
          ).unwrap();

          const { response: quizzes } = await dispatch(
            quizApi.endpoints.getQuizzes.initiate({})
          ).unwrap();

          const quizMarks = await dispatch(
            quizMarkApi.endpoints.getAllQuizMark.initiate()
          ).unwrap();

          // delete video related assignments

          if (assignments?.length > 0) {
            const findAssignment = assignments.find(
              (assignment) => assignment?.video_id === id
            );

            if (findAssignment?.id) {
              const assignmentId = Number(findAssignment.id);
              dispatch(
                assignmentApi.endpoints.deleteAssignment.initiate(assignmentId)
              );
            }
          }

          // delete video related quizzes

          if (quizzes?.length > 0) {
            const videoRelatedQuizzes = quizzes.filter(
              (quiz) => quiz?.video_id === id
            );
            if (videoRelatedQuizzes?.length > 0) {
              videoRelatedQuizzes.forEach((videoQuiz) => {
                const id = videoQuiz?.id;
                dispatch(quizApi.endpoints.deleteQuiz.initiate(id));
              });
            }
          }

          // delete video related quiz marks

          if (quizMarks?.length > 0) {
            const videoRelatedQuizMarks = quizMarks.filter(
              (quiz) => quiz?.video_id === id
            );
            if (videoRelatedQuizMarks?.length > 0) {
              videoRelatedQuizMarks.forEach((videoQuiz) => {
                const id = videoQuiz?.id;
                dispatch(quizMarkApi.endpoints.deleteQuizMark.initiate(id));
              });
            }
          }
        } catch (err) {}
      },
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "getAssignmentVideos", id: undefined },
      ],
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
