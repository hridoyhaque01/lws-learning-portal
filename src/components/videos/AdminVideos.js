import React from "react";
import VideosTableRow from "../../components/videos/VideosTableRow";
import {
  useDeleteVideoMutation,
  useGetVideosQuery,
} from "../../features/videos/videosApi";

export default function AdminVideos({ handler }) {
  const [deleteVideo, { isSuccess }] = useDeleteVideoMutation();

  const deleteHandler = (id) => {
    deleteVideo(id);
  };

  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (!isLoading && isError) {
    content = <div>{error?.data}</div>;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <div>no video found!</div>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Video Title</th>
            <th className="table-th">Description</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/50">
          {videos.map((video) => {
            const { title, description, id } = video || {};
            const filterTitle =
              title?.length > 90 ? title.slice(0, 90) + "..." : title;
            const filterDescription =
              description?.length > 50
                ? description.slice(0, 50) + "..."
                : description;
            return (
              <VideosTableRow
                key={id}
                title={filterTitle}
                description={filterDescription}
                handleModal={() => handler(video, "edit")}
                handleDelete={() => deleteHandler(id)}
              />
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="px-3 py-20 bg-opacity-10">
      <div className="w-full flex">
        <button className="btn ml-auto" onClick={() => handler({}, "add")}>
          Add Video
        </button>
      </div>
      <div className="overflow-x-auto mt-4">{content}</div>
    </div>
  );
}
