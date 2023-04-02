import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import QuizModal from "../../components/modals/QuizModal";
import AdminQuiz from "../../components/quizzes/AdminQuiz";

export default function Quizzes() {
  const [openedModal, setOpenedModal] = useState(false);
  const [modalQuiz, setModalQuiz] = useState();
  const [type, setType] = useState("");

  const controlModal = () => {
    setOpenedModal(false);
  };

  const controlInsideModal = (quiz, modalType) => {
    setOpenedModal(true);
    setModalQuiz(quiz);
    setType(modalType);
  };
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AdminQuiz handler={controlInsideModal} />
        </div>
        <QuizModal
          quiz={modalQuiz}
          type={type}
          open={openedModal}
          control={controlModal}
        />
      </section>
    </>
  );
}
