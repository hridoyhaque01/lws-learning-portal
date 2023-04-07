import React, { useState } from "react";
import { useEditAssignmentMarkMutation } from "../../features/assignmentmark/assignmentMarkApi";
import getLocalDate from "../../utils/getLocalDate";

export default function AssignmentMarkTableRow({ assignment, page }) {
  const {
    title,
    createdAt,
    student_name,
    repo_link,
    mark,
    status,
    totalMark,
    id,
  } = assignment || {};
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;

    if (value > totalMark || value < 0) return;
    else {
      setValue(value);
    }
  };

  const [editAssignmentMark, { isLoading }] = useEditAssignmentMarkMutation();

  const handleSubmit = () => {
    if (value !== "") {
      editAssignmentMark({
        id,
        data: { mark: Number(value), status: "published" },
        page,
      });
    }
  };

  // console.log(status);

  return (
    <tr>
      <td className="table-td">{title}</td>
      <td className="table-td">{getLocalDate(createdAt)}</td>
      <td className="table-td">{student_name}</td>
      <td className="table-td">{repo_link}</td>

      {status === "pending" ? (
        <td className="table-td input-mark">
          <input type="number" value={value} onChange={handleChange} />

          <button type="button" onClick={handleSubmit} disabled={isLoading}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </td>
      ) : (
        <td className="table-td">{mark}</td>
      )}
    </tr>
  );
}
