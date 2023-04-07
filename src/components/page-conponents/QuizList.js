import React from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../features/quizMark.js/quizMarkSlice";
import QuizInput from "../ui/inputes/QuizInput";

export default function QuizList({ currentQuestion, quizzes }) {
  const dispatch = useDispatch();

  const {
    id: questionId,
    video_title,
    question,
    options,
  } = quizzes?.[currentQuestion] || {};

  const handleChange = (e, index) => {
    dispatch(
      setAnswer({
        questionIndex: currentQuestion,
        optionIndex: index,
        value: e.target.checked,
      })
    );
  };
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{video_title}</h1>
        <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
      </div>
      <div className="space-y-8 ">
        <div className="quiz">
          <h4 className="question">{question}</h4>
          <form className="quizOptions">
            {/* <!-- Option 1 --> */}
            {options?.map((option, index) => {
              return (
                <QuizInput
                  key={option.id}
                  id={`option${option.id}_q${questionId}`}
                  title={option?.option}
                  text={option.title}
                  value={index}
                  checked={option.checked}
                  onChange={(e) => handleChange(e, index)}
                />
              );
            })}
          </form>
        </div>
      </div>
    </>
  );
}
