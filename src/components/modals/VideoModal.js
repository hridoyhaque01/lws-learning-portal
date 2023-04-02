import React, { useEffect, useState } from "react";
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "../../features/videos/videosApi";
import ModalInput from "../ui/ModalInput";
import TextArea from "../ui/TextArea";

export default function VideoModal({ open, control, video, type }) {
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    views: "",
    duration: "",
    url: "",
  });

  const [editVideo, { isSuccess: editSuccess }] = useEditVideoMutation();
  const [addVideo, { isSuccess: addSuccess }] = useAddVideoMutation();

  const resetForm = () => {
    setFormValue({
      title: "",
      description: "",
      views: "",
      duration: "",
      url: "",
    });
  };

  // handle submit form

  const handleSubmit = (e) => {
    e.preventDefault();
    const parseDuration = parseFloat(formValue.duration)
      .toFixed(2)
      .split(".")
      .join(":");
    const date = new Date();
    const isoTime = date.toISOString();

    if (type === "edit") {
      editVideo({
        id: formValue?.id,
        data: {
          ...formValue,
          views: formValue.views + "k",
          duration: parseDuration,
        },
      });
    }

    if (type === "add") {
      addVideo({
        ...formValue,
        views: formValue.views + "k",
        duration: parseDuration,
        createdAt: isoTime,
      });
    }
  };

  // handle the input field

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // check modal type and set the form

  useEffect(() => {
    if (video?.id && type === "edit") {
      const { views, duration } = video || {};
      const parseDuration = duration?.split(":").join(".");
      const newObj = {
        ...video,
        views: parseFloat(views),
        duration: parseFloat(parseDuration).toFixed(2),
      };
      setFormValue(newObj);
    } else {
      resetForm();
    }
  }, [video, type]);

  // control the modal

  useEffect(() => {
    if (editSuccess || addSuccess) {
      control();
    }
  }, [editSuccess, addSuccess]);

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed top-0 left-0 w-full h-full inset-0 z-10 bg-secondary-400 cursor-pointer"
        ></div>
        <div className="rounded-md w-500 lg:w-[600px] space-y-6 bg-secondary p-8 absolute position-center z-20 shadow-md border border-slate-50/10 ">
          <div className="absolute top-1 right-1 ">
            <button className="" type="button" onClick={control}>
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
            {type === "add" ? "Add" : "Edit"} Video
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm  space-y-2">
              <ModalInput
                id="title"
                title="Title"
                type="text"
                placeholder="enter video title..."
                value={formValue.title}
                onChange={(e) => handleChange(e)}
              />
              <ModalInput
                id="url"
                title="URL"
                type="text"
                placeholder="enter video url..."
                name="url"
                value={formValue.url}
                onChange={(e) => handleChange(e)}
              />
              <ModalInput
                id="views"
                title="Views"
                type="number"
                placeholder="enter video views..."
                name="views"
                value={formValue.views}
                onChange={(e) => handleChange(e)}
              />
              <ModalInput
                id="duration"
                title="Duration"
                type="number"
                placeholder="enter video duration..."
                name="duration"
                value={formValue.duration}
                onChange={(e) => handleChange(e)}
              />
              <TextArea
                id="description"
                title="Description"
                type="text"
                placeholder="enter video description..."
                name="description"
                value={formValue.description}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="group  relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {type === "add" ? "Add Video" : "Update Video"}
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}
