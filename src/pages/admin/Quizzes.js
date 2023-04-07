import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import QuizModal from "../../components/modals/QuizModal";
import AdminQuiz from "../../components/quizzes/AdminQuiz";

export default function Quizzes() {
  const [openedModal, setOpenedModal] = useState(false);

  const closeModal = () => {
    setOpenedModal(false);
  };

  const openModal = () => {
    setOpenedModal(true);
  };

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AdminQuiz control={openModal} />
        </div>
        <QuizModal open={openedModal} control={closeModal} />
      </section>
    </>
  );
}
