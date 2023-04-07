import React from "react";
import VideoDescription from "./VideoDescription";
import VideoPlayer from "./VideoPlayer";

export default function Player({ control, data }) {
  const { video } = data || {};

  return (
    <>
      <VideoPlayer videoLink={video?.url} videoTitle={video?.title} />
      <VideoDescription allData={data} video={video} control={control} />
    </>
  );
}
