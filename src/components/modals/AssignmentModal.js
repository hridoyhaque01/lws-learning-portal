import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddAssignmentMutation,
  useEditAssignmentMutation,
} from "../../features/assignment/assignmentApi";
import {
  selectAssignment,
  selectAssignmentModal,
  selectAssignmentType,
  selectAssingmentPage,
} from "../../features/assignment/assignmentSelectors";
import { setAssignment } from "../../features/assignment/assignmentSlice";
import { useGetAssignmentVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/errors/Error";
import ModalInput from "../ui/inputes/ModalInput";

export default function AssignmentModal() {
  const type = useSelector(selectAssignmentType);
  const assignment = useSelector(selectAssignment);
  const page = useSelector(selectAssingmentPage);
  const modal = useSelector(selectAssignmentModal);

  const { video_id } = assignment || {};

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    video_title: "",
    video_id: null,
    totalMark: null,
  });

  const {
    data: videos,
    isLoading,
    isError,
    error,
  } = useGetAssignmentVideosQuery(video_id);
  const [
    addAssignment,
    {
      isSuccess: addSuccess,
      isLoading: addLoading,
      isError: isAddError,
      error: addError,
    },
  ] = useAddAssignmentMutation();

  const [
    editAssignment,
    {
      isSuccess: editSuccess,
      isLoading: editLoading,
      isError: isEditError,
      error: editError,
    },
  ] = useEditAssignmentMutation();

  // decide what to render

  let content = null;

  if (isLoading) {
    content = <div className="skeleton-item w-full h-8"></div>;
  } else if (!isLoading && isError) {
    content = <Error bg="error" message={error?.data} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <div>No Videos Was Found!</div>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <select
        name="video_title"
        id="video_title"
        required
        className="edit-input rounded-md"
        value={formData.video_title}
        onChange={(e) => handleChange(e)}
      >
        <option value="" hidden>
          Select Video
        </option>
        {videos.map((video) => {
          const { id, title } = video || {};
          const parseTitle =
            title?.length >= 40 ? title.slice(0, 40) + "..." : title;
          return (
            <option key={id} video_id={id} value={`${title}`}>
              {parseTitle}
            </option>
          );
        })}
      </select>
    );
  }

  // handle submit form

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "add") {
      addAssignment({ ...formData, totalMark: Number(formData.totalMark) });
    } else if (type === "edit") {
      editAssignment({
        id: assignment?.id,
        data: { ...formData, totalMark: Number(formData.totalMark) },
        page,
      });
    }
    resetForm();
  };

  // handle the input field

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "video_title") {
      const video = videos.find((v) => v.title === value);
      setFormData({ ...formData, [name]: value, video_id: video?.id });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleModal = () => {
    dispatch(setAssignment({ assignmentModal: false }));
  };

  // reset form data

  const resetForm = () => {
    setFormData({
      title: "",
      video_title: "",
      video_id: null,
      totalMark: "",
    });
  };

  useEffect(() => {
    if (assignment?.id && type === "edit") {
      setFormData(assignment);
    } else {
      resetForm();
    }
  }, [assignment, type]);

  useEffect(() => {
    if (editSuccess || addSuccess) {
      handleModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSuccess, addSuccess]);

  return (
    modal && (
      <>
        <div
          onClick={handleModal}
          className="fixed top-0 left-0 w-full h-full inset-0 z-10 bg-secondary-400 cursor-pointer"
        ></div>
        <div className="rounded-md w-500 lg:w-[600px] space-y-6 bg-secondary p-8 absolute position-center z-20 shadow-md border border-slate-50/10 ">
          <div className="absolute top-1 right-1 ">
            <button className="" type="button" onClick={handleModal}>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <h2 className=" text-center text-3xl font-extrabold text-white">
            {type === "add" ? "Add" : "Edit"} Assignment
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm  space-y-2">
              <ModalInput
                id="title"
                title="Title"
                type="text"
                placeholder="enter video title..."
                value={formData.title}
                onChange={(e) => handleChange(e)}
              />
              <div className="flex items-center justify-between">
                <label className="nowrap" htmlFor="videoTitle">
                  Video Title :
                </label>
                {content}
              </div>

              <ModalInput
                id="totalMark"
                title="totalMark"
                type="number"
                placeholder="enter assignment total mark..."
                value={formData.totalMark}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <button
                disabled={addLoading || editLoading}
                type="submit"
                className="group  relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {type === "add" ? "Add Assignment" : "Update Assignment"}
              </button>
            </div>
          </form>
          {!addLoading && isAddError && (
            <Error bg="error" message={addError?.data} />
          )}
          {!editLoading && isEditError && (
            <Error bg="error" message={editError?.data} />
          )}
        </div>
      </>
    )
  );
}
