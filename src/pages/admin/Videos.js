import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import VideoModal from "../../components/modals/VideoModal";
import AdminVideos from "../../components/videos/AdminVideos";

export default function Videos() {
  const [openedModal, setOpenedModal] = useState(false);

  const closeModal = () => {
    setOpenedModal(false);
  };

  const openModal = () => {
    setOpenedModal(true);
  };

  return (
    <div>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AdminVideos control={openModal} />
        </div>
        <VideoModal open={openedModal} control={closeModal} />
      </section>
    </div>
  );
}
