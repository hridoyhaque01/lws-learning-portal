import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import AssignmentModal from "../../components/modals/AssignmentModal";
import VideoList from "../../components/relativeVideos/VideoList";
import Blank from "../../components/videos/Blank";

export default function CoursePlayer() {
  const [opened, setOpened] = useState(false);
  // const video = useSelector(selectVideoPlayer);

  // const [isVideoAvailable, setIsVideoAvailable] = useState(false);

  // const { data, isSuccess } = useGetPlayerVideoQuery(undefined, {
  //   skip: !isVideoAvailable,
  // });

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  // const { videoId } = useParams();

  // useState(() => {
  //   if (isSuccess) {
  //   }
  // }, []);

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              <Blank />
            </div>

            <VideoList />
          </div>
        </div>
      </section>
      <AssignmentModal open={opened} control={controlModal} />
    </>
  );
}
