import { apiSlice } from "../api/apiSlice";

const assignmentMarkLimit = process.env.REACT_APP_ASSIGNMENTMARK_PAGE;

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentsMark: builder.query({
      query: ({ page = 1, limit }) => ({
        url: `/assignmentMark?_page=${page}&_limit=${limit}`,
      }),
      providesTags: ["assignmentMark"],
      transformResponse: (response, meta, arg) => {
        const totalAssignments = Number(
          meta.response.headers.get("X-Total-Count")
        );
        const totalPages = Math.ceil(totalAssignments / arg.limit);

        const status = { total: totalAssignments, pending: 0, published: 0 };

        if (totalAssignments > 0) {
          const pending = response.reduce(
            (totalPending, res) =>
              res.status === "pending" ? totalPending + 1 : totalPending,
            0
          );
          const published = response.reduce(
            (totalPublished, res) =>
              res.status === "published" ? totalPublished + 1 : totalPublished,
            0
          );

          return {
            status: {
              ...status,
              pending,
              published,
            },
            response,
            totalAssignments,
            totalPages,
          };
        } else {
          return {
            response,
            totalAssignments,
            totalPages,
            status,
          };
        }
      },
    }),
    getAssignmentUser: builder.query({
      query: (id) => ({
        url: `/assignmentMark?student_id_like=${id}`,
      }),
      transformResponse: (response) => {
        if (response?.length !== 0) {
          return {
            response,
            assignmentQiven: true,
          };
        } else {
          return {
            response,
            assignmentQiven: false,
          };
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ page, id }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                { page, limit: assignmentMarkLimit },
                (draft) => {
                  const index = draft.response.findIndex(
                    (assignment) => assignment.id === id
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
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),

      async onQueryStarted({ page, id }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentsMark",
                { page, limit: assignmentMarkLimit },
                (draft) => {
                  draft.push(data);
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
  useGetAssignmentsMarkQuery,
  useEditAssignmentMarkMutation,
  useGetAssignmentUserQuery,
  useSubmitAssignmentMutation,
} = assignmentMarkApi;
