import { apiSlice } from "../api/apiSlice";
import { assignmentMarkApi } from "../assignmentmark/assignmentMarkApi";

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

      async onQueryStarted({ page, id }, { queryFulfilled, dispatch }) {
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

          // const get assignmentmark api response

          const { response: assignmentMarks } = await dispatch(
            assignmentMarkApi.endpoints.getAssignmentsMark.initiate({})
          ).unwrap();

          // update assignment mark title

          if (assignmentMarks?.length > 0) {
            const relatedAssignmentMark = assignmentMarks.filter(
              (assignmentMark) => assignmentMark?.assignment_id === id
            );
            if (relatedAssignmentMark?.length > 0) {
              relatedAssignmentMark.forEach((assignment) => {
                const assignmentId = assignment?.id;
                const title = data?.title;
                dispatch(
                  assignmentMarkApi.endpoints.editAssignmentMark.initiate({
                    id: assignmentId,
                    data: { title },
                    page: undefined,
                  })
                );
              });
            }
          }
        } catch (err) {}
      },
      invalidatesTags: (result, error, arg) => [
        "assignments",
        { type: "getAssignmentVideos", id: arg.id },
      ],
    }),
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "assignments",
        { type: "getAssignmentVideos", id: undefined },
      ],
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          const data = dispatch(
            assignmentMarkApi.endpoints.getAssignmentsMark.initiate({})
          );

          // get assignment mark response

          const { response: assignmentMarks } = await dispatch(
            assignmentMarkApi.endpoints.getAssignmentsMark.initiate({})
          ).unwrap();

          // delete assignment related mark

          if (assignmentMarks?.length > 0) {
            const filteredAssignments = assignmentMarks.filter(
              (assignmentMark) => assignmentMark?.assignment_id === id
            );
            if (filteredAssignments?.length > 0) {
              filteredAssignments.forEach((assignment) => {
                const assignmentId = assignment.id;
                dispatch(
                  assignmentMarkApi.endpoints.deleteAssignmentMark.initiate(
                    assignmentId
                  )
                );
              });
            }
          }
        } catch (err) {}
      },
      invalidatesTags: (result, error, arg) => [
        "assignments",
        { type: "getAssignmentVideos", id: undefined },
      ],
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
