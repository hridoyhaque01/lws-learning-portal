import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import VideoModal from "../../components/modals/VideoModal";
import AdminVideos from "../../components/videos/AdminVideos";

export default function Videos() {
  const [openedModal, setOpenedModal] = useState(false);
  const [modalVideo, setModalVideo] = useState();
  const [type, setType] = useState("");

  const controlModal = () => {
    setOpenedModal(false);
  };

  const controlInsideModal = (video, modalType) => {
    setOpenedModal(true);
    setModalVideo(video);
    setType(modalType);
  };

  return (
    <div>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AdminVideos handler={controlInsideModal} />
        </div>
        <VideoModal
          open={openedModal}
          video={modalVideo}
          control={controlModal}
          type={type}
        />
      </section>
    </div>
  );
}
