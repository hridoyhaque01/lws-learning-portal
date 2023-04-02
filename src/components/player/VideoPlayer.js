import React from "react";

export default function VideoPlayer({ videoLink, videoTitle }) {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={videoLink}
      title={videoTitle}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
}
