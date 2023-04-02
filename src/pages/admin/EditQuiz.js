import React from "react";
import EditQuizForm from "../../components/forms/EditQuizForm";
import Navigation from "../../components/Navigation";

export default function EditQuiz() {
  return (
    <>
      <Navigation />
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto lg:w-[600px] px-5 lg:px-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Edit Quiz
            </h2>
          </div>
          <EditQuizForm />
        </div>
      </section>
    </>
  );
}