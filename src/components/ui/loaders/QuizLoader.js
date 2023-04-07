import React from "react";

export default function QuizLoader() {
  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-0">
      <div className="mb-8">
        <div className="skeleton-item h-8"></div>
        <div className="skeleton-item h-6 my-2"></div>
        <div className="skeleton-item h-6"></div>
      </div>
      <div className="quiz">
        <div className="skeleton-item"></div>
        <form className="quizOptions">
          <div className="skeleton-item h-15"></div>
          <div className="skeleton-item h-15"></div>
          <div className="skeleton-item h-15"></div>
          <div className="skeleton-item h-15"></div>
        </form>
      </div>
    </div>
  );
}
