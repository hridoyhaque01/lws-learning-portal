import React from "react";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../features/assignment.js/assignmentApi";
import AssignmentTableRow from "./AssignmentTableRow";

export default function AssignmentsContent({ handler }) {
  const [deleteAssignment, { isSuccess }] = useDeleteAssignmentMutation();

  const deleteHandler = (id) => {
    deleteAssignment(id);
  };

  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <div>no video found!</div>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Title</th>
            <th className="table-th">Video Title</th>
            <th className="table-th">Mark</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/50">
          {assignments.map((assignment) => {
            const { title, video_title, id, totalMark } = assignment || {};
            const filterTitle =
              title?.length > 60 ? title.slice(0, 60) + "..." : title;
            const filterVideoTitle =
              video_title?.length > 50
                ? video_title.slice(0, 50) + "..."
                : video_title;
            return (
              <AssignmentTableRow
                key={id}
                title={filterTitle}
                videoTitle={filterVideoTitle}
                mark={totalMark}
                modalHandler={() => handler(assignment, "edit")}
                deleteHandler={() => deleteHandler(id)}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="px-3 py-20 bg-opacity-10">
      <div className="w-full flex">
        <button className="btn ml-auto" onClick={() => handler({}, "add")}>
          Add Assignment
        </button>
      </div>
      <div className="overflow-x-auto mt-4">{content}</div>
    </div>
  );
}
