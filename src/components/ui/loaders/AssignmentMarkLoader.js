import React from "react";

export default function AssignmentMarkLoader() {
  return (
    <div className="table-wrapper skeleton">
      <table className=" w-full">
        <thead>
          <tr>
            <th className="table-th">Assignment</th>
            <th className="table-th">Date</th>
            <th className="table-th">Student Name</th>
            <th className="table-th">Repo Link</th>
            <th className="table-th">Mark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
            <td>
              <span className="skeleton-item h-8"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
