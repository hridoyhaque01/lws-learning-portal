import React from "react";

export default function TextArea({ id, title, ...attributes }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="nowrap" htmlFor={id}>
        {title} :
      </label>
      <textarea
        name={id}
        id={id}
        {...attributes}
        className="edit-textarea rounded-md"
      ></textarea>
    </div>
  );
}
