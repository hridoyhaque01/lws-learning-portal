import React from "react";

export default function VideosLoader() {
  return (
    <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
      <div className="skeleton-item w-8 h-8 shrink-0 rounded-full"></div>
      <div className="w-full flex flex-col">
        <div className="skeleton-item w-full h-12 rounded-md"></div>
        <div>
          <p className="skeleton-item w-full h-6 rounded-md mt-1"></p>
        </div>
      </div>
    </div>
  );
}
