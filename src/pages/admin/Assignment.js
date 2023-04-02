import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import AdminAssignment from "../../components/assignment/AdminAssignment";
import AdminAssignmentModal from "../../components/modals/AdminAssignmentModal";

export default function Assignment() {
  const [openedModal, setOpenedModal] = useState(false);
  const [modalAssignment, setModalAssignment] = useState();
  const [type, setType] = useState("");

  const controlModal = () => {
    setOpenedModal(false);
  };

  const controlInsideModal = (assingment, modalType) => {
    setOpenedModal(true);
    setModalAssignment(assingment);
    setType(modalType);
  };

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AdminAssignment handler={controlInsideModal} />
        </div>
        <AdminAssignmentModal
          assignment={modalAssignment}
          type={type}
          open={openedModal}
          control={controlModal}
        />
      </section>
    </>
  );
}
