import React from "react";

export default function AssignmentLoader() {
  return (
    <div className="table-wrapper skeleton">
      <table className=" w-full">
        <thead>
          <tr>
            <th className="table-th">Title</th>
            <th className="table-th">Video Title</th>
            <th className="table-th">Mark</th>
            <th className="table-th">Action</th>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
