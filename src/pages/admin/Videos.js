import React from "react";
import Navigation from "../../components/Navigation";
import VideoModal from "../../components/modals/VideoModal";
import VideosTable from "../../components/table-components/tables/VideosTable";

export default function Videos() {
  return (
    <div>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <VideosTable />
        </div>
        <VideoModal />
      </section>
    </div>
  );
}
