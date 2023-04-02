import React from "react";

export default function Error({ message, bg }) {
  return (
    <div className={`error-container ${bg}`}>
      <h4 className="text-lg">{message || "Something is wrong!"}</h4>
    </div>
  );
}
