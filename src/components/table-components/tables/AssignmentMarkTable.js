import React, { useState } from "react";
import { useGetAssignmentsMarkQuery } from "../../../features/assignmentmark/assignmentMarkApi";
import Error from "../../ui/errors/Error";
import AssignmentMarkLoader from "../../ui/loaders/AssignmentMarkLoader";
import AssignmentMarkRow from "../rows/AssignmentMarkRow";

export default function AssignmentMarkTable() {
  const [page, setPage] = useState(1);

  // rtk queries
  const limit = process.env.REACT_APP_ASSIGNMENTMARK_PAGE;

  const { data, isLoading, isError, error } = useGetAssignmentsMarkQuery({
    page,
    limit,
  });

  const { totalPages, status, response: assignments } = data || {};

  const { total, pending, published } = status || {};

  // handlers

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <AssignmentMarkLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <Error bg="not-found" message="No Assignment feedback found!" />;
  } else if (!isLoading && !isError && assignments?.length > 0) {
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
            <AssignmentMarkRow
              key={assignment.id}
              assignment={assignment}
              page={page}
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
      {!isLoading && !isError && totalPages !== 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={handlePrev}
            type="button"
            className="group  relative  flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            prev
          </button>
          <div className="bg-purple-400 py-2 px-5 rounded-md">
            {page} / {totalPages}
          </div>
          <button
            onClick={handleNext}
            type="button"
            className="group  relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}
