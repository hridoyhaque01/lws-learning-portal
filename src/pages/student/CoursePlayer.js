import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import AssignmentModal from "../../components/modals/AssignmentModal";
import VideoList from "../../components/relativeVideos/VideoList";
import { selectId, selectName } from "../../features/auth/authSelectors";
import {
  useGetPlayerVideoQuery,
  useGetVideoQuery,
} from "../../features/videos/videosApi";

import Player from "../../components/player/Player";
import Error from "../../components/ui/errors/Error";
import VideoPlayerLoader from "../../components/ui/loaders/VideoPlayerLoader";
import { loadAssignmentInfo } from "../../features/assignmentmark/assignmentMarkSlice";

export default function CoursePlayer() {
  const [opened, setOpened] = useState(false);
  const [isParamAvailable, setIsParamAvailable] = useState(false);
  const [randomVideo, setRandomVideo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { videoId } = useParams();
  const userId = useSelector(selectId);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

  // control modal

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  // call api's

  const { data } = useGetPlayerVideoQuery(undefined, {
    skip: !randomVideo,
  });

  const {
    data: allData,
    isLoading,
    isError,
    error,
  } = useGetVideoQuery(
    {
      id: videoId,
      userId: userId,
    },
    {
      skip: !isParamAvailable,
    }
  );

  const { assignment } = allData || {};

  useEffect(() => {
    if (videoId) {
      localStorage.setItem("prevPlayedVideo", videoId);
      setRandomVideo(false);
      setIsParamAvailable(true);
    } else if (videoId === undefined) {
      const id = localStorage.getItem("prevPlayedVideo");
      if (id == null) {
        setRandomVideo(true);
        setIsParamAvailable(false);
      } else {
        setRandomVideo(false);
        setIsParamAvailable(true);
        navigate(`/courses/${id}`);
      }
    }
  }, [location, videoId, navigate]);

  useEffect(() => {
    if (data?.length > 0) {
      const video = data[0];
      if (video?.id) {
        localStorage.setItem("prevPlayedVideo", video.id);
        navigate(`/courses/${video.id}`);
      }
    }
  }, [location, data?.id, navigate, data]);

  useEffect(() => {
    if (assignment?.[0]?.id) {
      const { id, title, totalMark } = assignment[0] || {};
      const storeAssignment = {
        assignment_id: id,
        student_id: userId,
        student_name: userName,
        title,
        totalMark,
      };

      dispatch(loadAssignmentInfo(storeAssignment));
    }
  }, [dispatch, userId, userName, assignment]);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <VideoPlayerLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.data} />;
  } else if (!isLoading && !isError && !allData?.video?.id) {
    content = <Error bg="not-found" message={"No videos Found!"} />;
  } else if (!isLoading && !isError && allData?.video?.id) {
    content = <Player control={controlModal} data={allData} />;
  }

  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              {content}
            </div>
            <VideoList />
          </div>
        </div>
      </section>
      <AssignmentModal open={opened} control={controlModal} />
    </>
  );
}
