import React from "react";

export default function SubmitButton({ name, ...attributes }) {
  return (
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
      {...attributes}
    >
      {name}
    </button>
  );
}
