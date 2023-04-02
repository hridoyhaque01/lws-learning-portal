import { apiSlice } from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
      transformResponse: (response, meta, arg) => {
        let videos;
        if (response?.length > 0) {
          videos = response.filter((video) => !video.email);
          return videos;
        } else {
          return response;
        }
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                const index = draft.findIndex((video) => video.id === data?.id);
                if (index !== -1) {
                  draft[index] = data;
                }
              })
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

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(data);
              })
            );
          }
        } catch (err) {}
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              return draft?.filter((el) => el?.id !== id);
            })
          );
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useEditVideoMutation,
  useAddVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
