import React from "react";
import LeaderBoardTableRow from "./LeaderBoardTableRow";

export default function LeaderBoardTable() {
  return (
    <table className="text-base w-full border border-slate-600/50 rounded-md my-4">
      <thead>
        <tr className="border-b border-slate-600/50">
          <th className="table-th !text-center">Rank</th>
          <th className="table-th !text-center">Name</th>
          <th className="table-th !text-center">Quiz Mark</th>
          <th className="table-th !text-center">Assignment Mark</th>
          <th className="table-th !text-center">Total</th>
        </tr>
      </thead>

      <tbody>
        <LeaderBoardTableRow />
      </tbody>
    </table>
  );
}
