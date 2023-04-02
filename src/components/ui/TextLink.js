import React from "react";
import { Link } from "react-router-dom";

export default function TextLink({ name, link }) {
  return (
    <div className="text-sm">
      <Link
        to={link}
        className="font-medium text-violet-600 hover:text-violet-500"
      >
        {name}
      </Link>
    </div>
  );
}
