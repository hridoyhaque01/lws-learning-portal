import React from "react";

export default function Checkbox({ inputId, title, ...attribute }) {
  return (
    <div>
      <input type="checkbox" id={inputId} {...attribute} />
      <label htmlFor={inputId} className="ml-[6px] text-lg">
        {title}
      </label>
    </div>
  );
}
