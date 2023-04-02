import React from "react";
import { useGetAssignmentsMarkQuery } from "../../features/assignmentmark/assignmentMarkApi";
import AssignmentMarkTableRow from "./AssignmentMarkTableRow";

export default function AssignmentMarkContent() {
  const { data, isLoading, isError, error } = useGetAssignmentsMarkQuery();

  // decide what to render

  let content = null;

  const { status, response: assignments } = data || {};
  const { total, pending, published } = status || {};

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <div>No Assignment found!</div>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    // console.log(`row = ${JSON.stringify(assignments[0].status)}`);
    // console.log(`row = ${JSON.stringify(assignments[1].status)}`);
    // console.log(`row = ${JSON.stringify(assignments[2].status)}`);

    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Assignment</th>
            <th className="table-th">Date</th>
            <th className="table-th">Student Name</th>
            <th className="table-th">Repo Link</th>
            <th className="table-th">Mark</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {assignments?.map((assignment) => (
            <AssignmentMarkTableRow
              key={assignment.id}
              assignment={assignment}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="px-3 py-20 bg-opacity-10">
      {!isLoading && (
        <ul className="assignment-status">
          <li>
            Total <span>{total}</span>
          </li>
          <li>
            Pending <span>{pending}</span>
          </li>
          <li>
            Mark Sent <span>{published}</span>
          </li>
        </ul>
      )}
      <div className="overflow-x-auto mt-4">{content}</div>
    </div>
  );
}
