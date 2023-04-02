import React from "react";

export default function ModalInput({ id, title, ...attributes }) {
  return (
    <div className="flex items-center justify-between">
      <label className=" nowrap" htmlFor={id}>
        {title} :
      </label>
      <input
        id={id}
        name={id}
        required
        className="edit-input rounded-md"
        {...attributes}
      />
    </div>
  );
}
