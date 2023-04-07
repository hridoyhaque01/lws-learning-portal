/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";

export default function VideoPlayerLoader() {
  return (
    <div>
      <div className="skeleton-item w-full h-[420px]"></div>
      <div>
        <h2 className=" skeleton-item h-6 rounded-md mb-2"></h2>
        <h2 className=" skeleton-item h-6 rounded-md mb-2"></h2>
        <h2 className=" skeleton-item h-6 rounded-md mb-2"></h2>

        <div className="flex gap-2">
          <p className="skeleton-item w-80 h-12 rounded-full"></p>
          <p className="skeleton-item w-80 h-12 rounded-full"></p>
        </div>
        <p className="skeleton-item h-6 rounded-md mt-2"></p>
        <p className="skeleton-item h-6 rounded-md mt-2"></p>
        <p className="skeleton-item h-6 rounded-md mt-2"></p>
      </div>
    </div>
  );
}
