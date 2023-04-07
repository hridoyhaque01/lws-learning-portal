import React from "react";

export default function Blank() {
  return (
    <div className="h-[300px] flex flex-col items-center justify-center w-full bg-secondary">
      <h4 className="text-3xl font-bold mb-2">No video was playing</h4>
      <p>for playing a video select an video</p>
    </div>
  );
}
