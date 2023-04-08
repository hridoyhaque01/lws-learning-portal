import React from "react";

export default function QuizTableLoader() {
  return (
    <div className="table-wrapper skeleton">
      <table className=" w-full">
        <thead>
          <tr>
            <th>
              <span className="skeleton-item"></span>
            </th>
            <th>
              <span className="skeleton-item"></span>
            </th>
            <th>
              <span className="skeleton-item"></span>
            </th>
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
          </tr>
        </tbody>
      </table>
    </div>
  );
}
