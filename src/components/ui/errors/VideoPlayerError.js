import React from "react";

export default function VideoPlayerError({ message, bg }) {
  return (
    <div
      className={`error-container video-player-error flex items-center justify-center ${bg}`}
    >
      <h4 className="text-lg">{message || "Something is wrong!"}</h4>
    </div>
  );
}
