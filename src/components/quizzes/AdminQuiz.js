import React from "react";
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../../features/quiz/quizApi";
import QuizzesTableRow from "./QuizzesTableRow";

export default function AdminQuiz({ handler }) {
  const [deleteQuiz, { isSuccess }] = useDeleteQuizMutation();

  const deleteHandler = (id) => {
    deleteQuiz(id);
  };

  const { data: quizzes, isLoading, isError, error } = useGetQuizzesQuery();

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <div>no video found!</div>;
  } else if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Question</th>
            <th className="table-th">Video</th>
            <th className="table-th justify-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/50">
          {quizzes.map((quiz) => {
            const { question, video_title, id } = quiz || {};
            const filterQuestion =
              question?.length > 60 ? question.slice(0, 60) + "..." : question;
            const filterVideoTitle =
              video_title?.length > 50
                ? video_title.slice(0, 50) + "..."
                : video_title;
            return (
              <QuizzesTableRow
                key={id}
                question={filterQuestion}
                videoTitle={filterVideoTitle}
                modalHandler={() => handler(quiz, "edit")}
                deleteHandler={() => deleteHandler(id)}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="px-3 py-20 bg-opacity-10">
      <div className="w-full flex">
        <button className="btn ml-auto" onClick={() => handler({}, "add")}>
          Add Quiz
        </button>
      </div>
      <div className="overflow-x-auto mt-4">{content}</div>
    </div>
  );
}
