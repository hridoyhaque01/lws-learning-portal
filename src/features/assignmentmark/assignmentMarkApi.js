import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: () => ({
        url: "/assignmentMark",
        method: "GET",
      }),
      transformResponse: (response) => {
        let status = { total: 0, pending: 0, published: 0 };
        if (response?.length > 0) {
          const pending = response.reduce(
            (totalPending, res) =>
              res?.status === "pending" ? 1 + totalPending : totalPending,
            0
          );

          const published = response.reduce(
            (totalPublished, res) =>
              res?.status === "published" ? 1 + totalPublished : totalPublished,
            0
          );

          return {
            status: {
              total: response?.length,
              pending,
              published,
            },
            response,
          };
        }
        return { status, response };
      },
    }),
    addAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                undefined,
                (draft) => {
                  const index = draft.response.findIndex(
                    (assignment) => assignment.id === arg.id
                  );

                  if (index !== -1) {
                    draft.status.pending = draft.status.pending - 1;
                    draft.status.published = draft.status.published + 1;
                    draft.response[index] = data;
                  }
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
  }),
});

export const { useGetAssignmentsMarkQuery, useAddAssignmentMarkMutation } =
  assignmentMarkApi;
