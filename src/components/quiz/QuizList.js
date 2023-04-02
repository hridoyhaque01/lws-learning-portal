import React from "react";
import QuizInput from "./QuizInput";

export default function QuizList({ question, options, id }) {
  return (
    <div className="space-y-8 ">
      <div className="quiz">
        <h4 className="question">{question}</h4>
        <form className="quizOptions">
          {/* <!-- Option 1 --> */}
          {options?.map((option) => {
            console.log(`option${option.id}_q${id}`);
            return (
              <QuizInput
                key={option.id}
                id={`option${option.id}_q${id}`}
                title={option.option}
              />
            );
          })}
        </form>
      </div>
    </div>
  );
}
