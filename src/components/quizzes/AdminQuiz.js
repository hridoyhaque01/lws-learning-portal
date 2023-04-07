import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../../features/quiz/quizApi";
import { setQuiz } from "../../features/quiz/quizSlice";
import Error from "../ui/errors/Error";
import QuizTableLoader from "../ui/loaders/QuizTableLoader";
import QuizzesTableRow from "./QuizzesTableRow";

export default function AdminQuiz({ control }) {
  const [page, setPage] = useState(1);

  // rtk queries
  const limit = process.env.REACT_APP_QUIZE_PER_PAGE;

  const { data, isLoading, isError, error } = useGetQuizzesQuery({
    page,
    limit,
  });

  const { totalPages, response: quizzes } = data || {};
  const dispatch = useDispatch();

  const [deleteQuiz, { isLoading: responseLoading }] = useDeleteQuizMutation();

  // handlers

  const deleteHandler = (id) => {
    deleteQuiz({ id, page });
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (quiz, type) => {
    dispatch(setQuiz({ quiz, type }));
    control();
  };

  // side effects

  useEffect(() => {
    if (page >= 1) {
      dispatch(setQuiz({ page }));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalPages < page) {
      setPage((prev) => prev - 1);
    }
  }, [totalPages, page]);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <QuizTableLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && quizzes?.length === 0) {
    content = <Error bg="not-found" message="Quiz not Found!" />;
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
                modalHandler={() => handleChange(quiz, "edit")}
                deleteHandler={() => deleteHandler(id)}
                loader={responseLoading}
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
        <button className="btn ml-auto" onClick={() => handleChange({}, "add")}>
          Add Quiz
        </button>
      </div>
      <div className="overflow-x-auto mt-4">{content}</div>
      {!isLoading && !isError && totalPages !== 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={handlePrev}
            type="button"
            className="group  relative  flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            prev
          </button>
          <div className="bg-purple-400 py-2 px-5 rounded-md">
            {page} / {totalPages}
          </div>
          <button
            onClick={handleNext}
            type="button"
            className="group  relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}
