import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import QuizList from "../../components/quiz/QuizList";

export default function Quiz() {
  const quize = [
    {
      id: 1,
      question: "What is a Debounce function in JavaScript?",
      video_id: 1,
      video_title:
        "Debounce Function in JavaScript - JavaScript Job Interview question",
      options: [
        {
          id: "1",
          option: "A function that is called after a certain time interval",
          isCorrect: true,
        },
        {
          id: "2",
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
        {
          id: 3,
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
        {
          id: 4,
          option: "A function that is called after a certain time interval",
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      question:
        "Which of the following is an example of a situation where you would use the Debounce function?",
      video_id: 1,
      video_title:
        "Debounce Function in JavaScript - JavaScript Job Interview question",
      options: [
        {
          id: "1",
          option: "A search bar where the results are displayed as you type.",
          isCorrect: true,
        },
        {
          id: "2",
          option: "A button that performs an action when clicked.",
          isCorrect: false,
        },
        {
          id: 3,
          option: "An animation that plays when a user hovers over an element.",
          isCorrect: false,
        },
        {
          id: 4,
          option: "All of the above.",
          isCorrect: false,
        },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // handle button for previous quistion

  const nextQuestion = () => {
    if (currentQuestion + 1 < quize.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    }
  };

  // handle button for previous quistion

  const prevQuestion = () => {
    if (currentQuestion >= 1 && currentQuestion <= quize.length) {
      setCurrentQuestion((prevCurrent) => prevCurrent - 1);
    }
  };

  console.log(quize[currentQuestion]);

  return (
    <>
      {/* <!-- Navigatin Bar. It contains Logo, Center Text And Save Progress Button at the end --> */}
      <Navigation navigate={true} />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{quize[0]?.video_title}</h1>
            <p className="text-sm text-slate-200">
              Each question contains 5 Mark
            </p>
          </div>
          <QuizList
            id={quize[currentQuestion].id}
            question={quize[currentQuestion].question}
            options={quize[currentQuestion].options}
          />
          <div className="flex justify-between">
            <div>
              {currentQuestion > 0 && (
                <button
                  onClick={prevQuestion}
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                >
                  Prev
                </button>
              )}
            </div>

            <div>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
              >
                {currentQuestion + 1 === quize?.length ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
