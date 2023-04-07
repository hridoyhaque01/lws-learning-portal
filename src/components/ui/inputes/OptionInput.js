import React from "react";

export default function OptionInput({ id, title, ...attributes }) {
  return (
    <div className="">
      <label htmlFor={id} className="sr-only">
        {title}
      </label>
      <input
        id={id}
        name={title}
        required
        className="quiz-input rounded-md"
        {...attributes}
      />
    </div>
  );
}
