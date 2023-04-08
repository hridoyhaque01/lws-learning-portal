import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import { useGetVideosQuery, videosApi } from "../../features/videos/videosApi";
import Error from "../ui/errors/Error";
import VideosLoader from "../ui/loaders/VideosLoader";
import VideoListItem from "./VideoListItem";

export default function VideoList() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useGetVideosQuery(page);
  const { response: videos, totalPages, totalVideos } = data || {};

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(videosApi.endpoints.getMoreVideos.initiate(page));
    }
  });

  useEffect(() => {
    if (totalVideos > 0) {
      const more = totalPages > page;
      setHasMore(more);
    }
  }, [totalVideos, page, totalPages]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = (
      <>
        <VideosLoader />
        <VideosLoader />
        <VideosLoader />
      </>
    );
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <Error bg="not-found" message="No Videos Found!" />;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<VideosLoader />}
        height={540}
      >
        {videos?.map((video) => (
          <VideoListItem
            id={video?.id}
            key={video.id}
            title={video?.title}
            duration={video?.duration}
            views={video?.views}
          />
        ))}
      </InfiniteScroll>
    );
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 video-list">
      {content}
    </div>
  );
}
