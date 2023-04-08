import React from "react";
import Navigation from "../../components/Navigation";
import QuizModal from "../../components/modals/QuizModal";
import QuizTable from "../../components/table-components/tables/QuizTable";

export default function Quizzes() {
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <QuizTable />
        </div>
        <QuizModal />
      </section>
    </>
  );
}
