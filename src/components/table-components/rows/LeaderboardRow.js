import React from "react";

export default function LeaderboardRow({ studentData }) {
  const { assignmentMark, name, rank, quizMark, totalMark } = studentData || {};
  return (
    <tr className="border-b border-slate-600/50">
      <td className="table-td text-center">{rank}</td>
      <td className="table-td text-center">{name}</td>
      <td className="table-td text-center">{quizMark}</td>
      <td className="table-td text-center">{assignmentMark}</td>
      <td className="table-td text-center">{totalMark}</td>
    </tr>
  );
}
