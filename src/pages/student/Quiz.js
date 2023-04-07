import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import QuizContent from "../../components/quiz/QuizContent";
import Error from "../../components/ui/errors/Error";
import QuizLoader from "../../components/ui/loaders/QuizLoader";
import { useGetAllQuizQuery } from "../../features/quiz/quizApi";

import { selectId, selectName } from "../../features/auth/authSelectors";
import { quizMarkApi } from "../../features/quizMark.js/quizMarkApi";
import {
  loadAllQuizzes,
  loadOriginalQuizzes,
} from "../../features/quizMark.js/quizMarkSlice";
import {
  selectAnswers,
  selectQuizzes,
} from "../../features/quizMark.js/quizSelectors";

export default function Quiz() {
  // get params
  const { quizId } = useParams();

  // react local state

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responseError, setResponseError] = useState("");
  const navigate = useNavigate();

  // redux selector selectors

  const quizzes = useSelector(selectQuizzes);
  const quizAnswers = useSelector(selectAnswers);
  const student_name = useSelector(selectName);
  const student_id = useSelector(selectId);

  const dispatch = useDispatch();

  // rtk query api request

  const id = Number(quizId);
  const { data: questions, isLoading, isError, error } = useGetAllQuizQuery(id);

  const { video_id, video_title } = questions?.[0] || {};

  const totalQuiz = questions?.length;

  // handle button for previous quistion

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions?.length) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // handle button for previous quistion

  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion < questions?.length) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  //
  const submit = () => {
    const data = handleSubmitData();
    dispatch(quizMarkApi.endpoints.addQuizMark.initiate(data))
      .unwrap()
      .then((result) => {
        if (result?.id) {
          // dispatch(quizMarkApi.endpoints.getAllQuizMark.initiate()).unwrap();
          navigate("/leaderboard");
        }
      })
      .catch((error) => {
        // handle error here
        setResponseError("Request failed");
      });
  };

  const handleSubmitData = () => {
    const { mark, totalCorrect } = calculateQuiz();

    const data = {
      student_id,
      student_name,
      video_id,
      video_title,
      totalQuiz,
      totalCorrect,
      totalWrong: totalQuiz - totalCorrect,
      totalMark: totalQuiz * 5,
      mark,
    };

    return data;
  };

  const calculateQuiz = () => {
    let mark = 0;
    let totalCorrect = 0;

    quizAnswers.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.options.forEach((option, index2) => {
        if (option.isCorrect) correctIndexes.push(index2);
        if (quizzes[index1].options[index2].checked) {
          checkedIndexes.push(index2);
        }
      });
      if (_.isEqual(correctIndexes, checkedIndexes)) {
        mark = mark + 5;
        totalCorrect = totalCorrect + 1;
      }
    });
    return { mark, totalCorrect };
  };

  useEffect(() => {
    dispatch(loadAllQuizzes(questions));
    dispatch(loadOriginalQuizzes(questions));
  }, [dispatch, questions]);

  // decide what to redner

  let content = null;

  if (isLoading) {
    content = <QuizLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && questions?.length === 0) {
    content = <Error bg="not-found" message="No Quiz Found!" />;
  } else if (!isLoading && !isError && questions?.length > 0) {
    content = (
      <QuizContent currentQuestion={currentQuestion} quizzes={quizzes} />
    );
  }

  return (
    <>
      {/* <!-- Navigatin Bar. It contains Logo, Center Text And Save Progress Button at the end --> */}
      <Navigation navigate={true} />
      <section className="py-20  bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          {content}
          {!isLoading && !isError && questions?.length > 0 && (
            <div className="flex justify-between items-center mt-10 gap-2">
              <button
                onClick={prevQuestion}
                type="button"
                className="group  relative  flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
              >
                prev
              </button>
              <div className="bg-purple-400 py-2 px-5 rounded-md">
                {currentQuestion + 1}/{questions?.length}
              </div>
              <button
                onClick={
                  questions?.length === currentQuestion + 1
                    ? submit
                    : nextQuestion
                }
                type="button"
                className="group  relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
              >
                {questions?.length === currentQuestion + 1 ? "Submit" : "Next"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
