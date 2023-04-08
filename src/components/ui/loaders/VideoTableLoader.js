import React from "react";

export default function VideoTableLoader() {
  return (
    <div className="table-wrapper skeleton">
      <table className=" w-full">
        <thead>
          <tr>
            <th>
              <span className="skeleton-item h-8"></span>
            </th>
            <th>
              <span className="skeleton-item h-8"></span>
            </th>
            <th>
              <span className="skeleton-item h-8"></span>
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
