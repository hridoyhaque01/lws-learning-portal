import React from "react";

export default function QuizInput({ title, id, ...attributes }) {
  return (
    <label htmlFor={id}>
      <input type="checkbox" id={id} {...attributes} />
      {title}
    </label>
  );
}
