import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import VideoDescription from "../../components/description/VideoDescription";
import AssignmentModal from "../../components/modals/AssignmentModal";
import VideoPlayer from "../../components/player/VideoPlayer";
import VideoList from "../../components/relativeVideos/VideoList";

export default function CoursePlayer() {
  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <VideoPlayer
                videoLink="https://www.youtube.com/embed/56zUkaXJnUA"
                videoTitle="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
              />

              <VideoDescription control={controlModal} />
            </div>

            <VideoList />
          </div>
        </div>
      </section>
      <AssignmentModal open={opened} control={controlModal} />
    </>
  );
}
