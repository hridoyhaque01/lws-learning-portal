import React from "react";
import { useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import LeaderBoardTableRow from "../../components/leaderboard/LeaderBoardTableRow";
import UserLeaderboardTable from "../../components/leaderboard/UserLeaderboardTable";
import Error from "../../components/ui/errors/Error";
import LeaderboardLoader from "../../components/ui/loaders/LeaderboardLoader";
import { selectId } from "../../features/auth/authSelectors";
import { useGetStudentResultQuery } from "../../features/mark/markApi";

export default function Leaderboard() {
  const { data, isLoading, isError, error } = useGetStudentResultQuery();
  const userId = useSelector(selectId);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <LeaderboardLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.data} />;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <Error bg="not-found" message={"No user's found"} />;
  } else if (!isLoading && !isError && data?.length > 0) {
    const unserInfo = data.find((student) => student.id === userId);

    content = (
      <>
        <div>
          <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
          <UserLeaderboardTable unserInfo={unserInfo} />
        </div>

        <div className="my-8">
          <h3 className="text-lg font-bold">Top 20 Result</h3>
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
              {data.map((student) => (
                <LeaderBoardTableRow studentData={student} key={student.id} />
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
      </section>
    </>
  );
}
