import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeleteAssignmentMutation,
  useGetAssignmentsQuery,
} from "../../../features/assignment/assignmentApi";
import { setAssignment } from "../../../features/assignment/assignmentSlice";
import {
  assignmentMarkApi,
  useGetAssignmentsMarkQuery,
} from "../../../features/assignmentmark/assignmentMarkApi";
import Error from "../../ui/errors/Error";
import AssignmentTableLoader from "../../ui/loaders/AssignmentTableLoader";
import AssignmentRow from "../rows/AssignmentRow";

export default function AssignmentTable({ control }) {
  const [page, setPage] = useState(1);

  // rtk queries
  const limit = Number(process.env.REACT_APP_ASSIGNMENT_PER_PAGE);
  const { data, isLoading, isError, error } = useGetAssignmentsQuery({
    page,
    limit,
  });

  const { data: assignmentMarksData } = useGetAssignmentsMarkQuery({});

  const { response: assignmentMarks } = assignmentMarksData || {};

  // console.log(data);
  // console.log(assignmentMarksData);

  const { totalPages, response: assignments } = data || {};
  const dispatch = useDispatch();

  const [deleteAssignment, { isLoading: responseLoading }] =
    useDeleteAssignmentMutation();

  // handlers

  const deleteHandler = async (id) => {
    try {
      await deleteAssignment(id);
      if (assignmentMarks?.length > 0) {
        const filteredAssignments = assignmentMarks.filter(
          (assignmentMark) => assignmentMark?.assignment_id === id
        );
        if (filteredAssignments?.length > 0) {
          console.log(filteredAssignments);
          filteredAssignments.forEach((assignment) => {
            const assignmentId = assignment.id;
            console.log(assignmentId);
            dispatch(
              assignmentMarkApi.endpoints.deleteAssignmentMark.initiate(
                assignmentId
              )
            );
          });
        }
      }
    } catch (err) {}
  };

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

  const handleChange = (assignment, type) => {
    dispatch(setAssignment({ assignment, type }));
    control();
  };

  // side effects

  useEffect(() => {
    if (page >= 1) {
      dispatch(setAssignment({ page }));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalPages < page) {
      setPage((prev) => prev - 1);
    }
  }, [totalPages, page]);

  // decide what to render

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <AssignmentTableLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <Error bg="not-found" message={"No Assignment found!"} />;
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
              <AssignmentRow
                key={id}
                title={filterTitle}
                videoTitle={filterVideoTitle}
                mark={totalMark}
                handleAssignment={() => handleChange(assignment, "edit")}
                handlerDelete={() => deleteHandler(id)}
                deleteLoad={responseLoading}
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
        <button className="btn ml-auto" onClick={() => handleChange({}, "add")}>
          Add Assignment
        </button>
      </div>
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