import React from "react";
import { Link } from "react-router-dom";
import getLocalDate from "../../utils/getLocalDate";

export default function VideoDescription({ control, video, allData }) {
  const { id, title, createdAt, description } = video || {};

  const { assignment, quizData, quizSubmit, assignmentSubmit } = allData || {};

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {getLocalDate(createdAt)}
      </h2>

      <div className="flex gap-4">
        {assignment?.length > 0 && assignmentSubmit && (
          <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            এসাইনমেন্ট জমা দিয়েছেন
          </div>
        )}

        {assignment?.length > 0 && !assignmentSubmit && (
          <button
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
            type="button"
            onClick={control}
          >
            এসাইনমেন্ট
          </button>
        )}

        {quizData?.length === 0 && (
          <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            কুইজ নেই
          </div>
        )}

        {quizData?.length > 0 && quizSubmit && (
          <div className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
            কুইজ দিয়েছেন
          </div>
        )}

        {quizData?.length > 0 && !quizSubmit && (
          <Link
            to={`/quiz/${id}`}
            className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
          >
            কুইজে অংশগ্রহণ করুন
          </Link>
        )}
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
}
