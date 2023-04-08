import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import SubmitAssignmentModal from "../../components/modals/SubmitAssignmentModal";
import VideoList from "../../components/page-conponents/VideoList";
import { selectId, selectName } from "../../features/auth/authSelectors";
import {
  useGetPlayerVideoQuery,
  useGetVideoQuery,
} from "../../features/videos/videosApi";

import VideoPlayer from "../../components/page-conponents/VideoPlayer";
import VideoPlayerError from "../../components/ui/errors/VideoPlayerError";
import VideoPlayerLoader from "../../components/ui/loaders/VideoPlayerLoader";
import { loadAssignmentInfo } from "../../features/assignmentmark/assignmentMarkSlice";

export default function CoursePlayer() {
  // manage local states

  const [isParamAvailable, setIsParamAvailable] = useState(false);
  const [randomVideo, setRandomVideo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { videoId } = useParams();

  // manage redux states

  const userId = useSelector(selectId);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

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

  // handle side effects

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
    content = <VideoPlayerError bg="error" message={error?.data} />;
  } else if (!isLoading && !isError && !allData?.video?.id) {
    content = <VideoPlayerError bg="not-found" message={"No videos Found!"} />;
  } else if (!isLoading && !isError && allData?.video?.id) {
    content = <VideoPlayer data={allData} />;
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
      <SubmitAssignmentModal />
    </>
  );
}
