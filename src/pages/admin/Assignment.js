import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import AdminAssignment from "../../components/assignment/AdminAssignment";
import AdminAssignmentModal from "../../components/modals/AdminAssignmentModal";

export default function Assignment() {
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
          <AdminAssignment control={openModal} />
        </div>
        <AdminAssignmentModal open={openedModal} control={closeModal} />
      </section>
    </>
  );
}
