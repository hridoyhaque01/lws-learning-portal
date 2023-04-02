import React from "react";

export default function TextInput({ title, id, lastInput, ...attributes }) {
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {title}
      </label>
      <input
        id={id}
        name={title}
        required
        className={`login-input  ${
          lastInput ? "rounded-b-md" : "rounded-t-md"
        }`}
        {...attributes}
      />
    </>
  );
}
