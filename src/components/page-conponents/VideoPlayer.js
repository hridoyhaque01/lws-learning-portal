import React from "react";
import Iframe from "./Iframe";
import VideoDescription from "./VideoDescription";

export default function VideoPlayer({ control, data }) {
  const { video } = data || {};

  return (
    <>
      <Iframe videoLink={video?.url} videoTitle={video?.title} />
      <VideoDescription allData={data} video={video} control={control} />
    </>
  );
}
