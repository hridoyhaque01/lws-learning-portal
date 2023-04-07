import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import VideosTableRow from "../../components/videos/VideosTableRow";
import {
  useDeleteVideoMutation,
  useGetVideosQuery,
} from "../../features/videos/videosApi";
import { setVideo } from "../../features/videos/videosSlice";
import Error from "../ui/errors/Error";
import VideoTableLoader from "../ui/loaders/VideoTableLoader";

export default function AdminVideos({ control }) {
  // local states

  const [page, setPage] = useState(1);

  // rtk queries

  const { data, isLoading, isError, error } = useGetVideosQuery(page);

  const { totalPages, response: videos } = data || {};
  const dispatch = useDispatch();

  const [deleteVideo, { isLoading: responseLoading }] =
    useDeleteVideoMutation();

  // handlers

  const deleteHandler = (id) => {
    deleteVideo({ id, page });
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleChange = (video, type) => {
    dispatch(setVideo({ video, type }));
    control();
  };

  // side effects

  useEffect(() => {
    if (page >= 1) {
      dispatch(setVideo({ page }));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (totalPages < page) {
      setPage((prev) => prev - 1);
    }
  }, [totalPages, page]);

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <VideoTableLoader />;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.error} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <Error bg="not-found" message="No Video Found!" />;
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
            // customize table data

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
                handleVideo={() => handleChange(video, "edit")}
                handleDelete={() => deleteHandler(id)}
                loading={responseLoading}
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
        <button className="btn ml-auto" onClick={() => handleChange({}, "add")}>
          Add Video
        </button>
      </div>
      <div className="overflow-x-auto mt-4">{content}</div>
      {!isLoading && !isError && totalPages !== 1 && (
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={handlePrev}
            type="button"
            className="group  relative  flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            prev
          </button>
          <div className="bg-purple-400 py-2 px-5 rounded-md">
            {page} / {totalPages}
          </div>
          <button
            onClick={handleNext}
            type="button"
            className="group  relative flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 capitalize"
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}
