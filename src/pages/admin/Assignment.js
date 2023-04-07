import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import AssignmentModal from "../../components/modals/AssignmentModal";
import AssignmentTable from "../../components/table-components/tables/AssignmentTable";

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
          <AssignmentTable control={openModal} />
        </div>
        <AssignmentModal open={openedModal} control={closeModal} />
      </section>
    </>
  );
}
