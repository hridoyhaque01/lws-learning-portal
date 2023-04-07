import React from "react";

export default function Iframe({ videoLink, videoTitle }) {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={videoLink}
      title={videoTitle}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
