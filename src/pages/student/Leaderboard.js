import React from "react";
import LeaderBoardHeader from "../../components/leaderboard/LeaderBoardHeader";
import LeaderBoardTable from "../../components/leaderboard/LeaderBoardTable";
import Navigation from "../../components/Navigation";

export default function Leaderboard() {
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div>
            <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
            <LeaderBoardHeader />
          </div>

          <div className="my-8">
            <h3 className="text-lg font-bold">Top 20 Result</h3>
            <LeaderBoardTable />
          </div>
        </div>
      </section>
    </>
  );
}
