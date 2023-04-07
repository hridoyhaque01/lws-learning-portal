import { apiSlice } from "../api/apiSlice";

const assignmentLimit = Number(process.env.REACT_APP_ASSIGNMENT_PER_PAGE);

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: ({ page = 1, limit }) => ({
        url: `/assignments?_page=${page}&_limit=${limit}`,
      }),
      providesTags: ["assignments"],
      transformResponse: (response, meta) => {
        const totalAssignments = Number(
          meta.response.headers.get("X-Total-Count")
        );
        const totalPages = Math.ceil(
          totalAssignments / process.env.REACT_APP_ASSIGNMENT_PER_PAGE
        );
        return {
          response,
          totalAssignments,
          totalPages,
        };
      },
    }),
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments?video_id_like=${id}`,
      }),
      transformResponse: (response) => {
        if (response?.length > 0) {
          return {
            response,
            assignmentAvailable: true,
          };
        } else {
          return {
            response,
            assignmentAvailable: false,
          };
        }
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data, page }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted({ page }, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                { page, limit: assignmentLimit },
                (draft) => {
                  const index = draft.response.findIndex(
                    (assignment) => assignment.id === data?.id
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
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["assignments"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useGetAssignmentQuery,
  useAddAssignmentMutation,
  useEditAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentApi;
