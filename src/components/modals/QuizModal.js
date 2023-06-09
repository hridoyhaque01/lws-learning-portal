import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from "../../features/quiz/quizApi";
import {
  selectQuiz,
  selectQuizModal,
  selectQuizPage,
  selectQuizType,
} from "../../features/quiz/quizSelectors";
import { setQuiz } from "../../features/quiz/quizSlice";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/errors/Error";
import Checkbox from "../ui/inputes/Checkbox";
import ModalInput from "../ui/inputes/ModalInput";
import OptionInput from "../ui/inputes/OptionInput";

export default function QuizModal() {
  const type = useSelector(selectQuizType);
  const quiz = useSelector(selectQuiz);
  const page = useSelector(selectQuizPage);
  const modal = useSelector(selectQuizModal);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    question: "",
    video_title: "",
    video_id: null,
    options: [
      {
        id: 1,
        option: "",
        isCorrect: false,
      },
      {
        id: 2,
        option: "",
        isCorrect: false,
      },
      {
        id: 3,
        option: "",
        isCorrect: false,
      },
      {
        id: 4,
        option: "",
        isCorrect: false,
      },
    ],
  });

  const { data, isLoading, isError } = useGetVideosQuery({ page });

  const { response: videos } = data || {};

  const [
    addQuiz,
    {
      isSuccess: addSuccess,
      isLoading: addLoading,
      isError: isAddError,
      error: addError,
    },
  ] = useAddQuizMutation();
  const [
    editQuiz,
    {
      isSuccess: editSuccess,
      isLoading: editLoading,
      isError: isEditError,
      error: editError,
    },
  ] = useEditQuizMutation();

  // decide what to render

  let content = null;

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => {
      const { id, title } = video || {};
      const parseTitle =
        title?.length >= 40 ? title.slice(0, 40) + "..." : title;
      return (
        <option key={id} video_id={id} value={`${title}`}>
          {parseTitle}
        </option>
      );
    });
  }

  // handle submit form

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "add") {
      addQuiz(formData);
    } else if (type === "edit") {
      editQuiz({ id: quiz?.id, data: formData, page });
    }

    resetForm();
  };

  // handle the input field

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "video_title") {
      const video = videos.find((v) => v.title === value);
      setFormData({
        ...formData,
        options: [...formData.options],
        [name]: value,
        video_id: video?.id,
      });
    } else {
      setFormData({
        ...formData,
        options: [...formData.options],
        [name]: value,
      });
    }
  };

  const handleOptionChange = (e, id) => {
    const updatedOption = formData.options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          option: e.target.value,
        };
      }
      return option;
    });

    setFormData({ ...formData, options: updatedOption });
  };

  const handleCheckbox = (e, id) => {
    console.log();
    const updatedOption = formData.options.map((option) => {
      if (option.id === id) {
        return {
          ...option,
          isCorrect: e.target.checked,
        };
      }
      return option;
    });
    setFormData({ ...formData, options: updatedOption });
  };

  const handleModal = () => {
    dispatch(setQuiz({ quizModal: false }));
  };

  // reset form data

  const resetForm = () => {
    setFormData({
      question: "",
      video_title: "",
      video_id: null,
      options: [
        {
          id: 1,
          option: "",
          isCorrect: false,
        },
        {
          id: 2,
          option: "",
          isCorrect: false,
        },
        {
          id: 3,
          option: "",
          isCorrect: false,
        },
        {
          id: 4,
          option: "",
          isCorrect: false,
        },
      ],
    });
  };

  useEffect(() => {
    if (quiz?.id && type === "edit") {
      setFormData(quiz);
    } else {
      resetForm();
    }
  }, [quiz, type]);

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
            {type === "add" ? "Add" : "Edit"} Quiz
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm  space-y-2">
              <ModalInput
                id="question"
                title="question"
                type="text"
                placeholder="enter qustion..."
                value={formData.question}
                onChange={(e) => handleChange(e)}
              />
              <div className="flex items-center justify-between">
                <label className="nowrap" htmlFor="videoTitle">
                  Video Title :
                </label>

                {!isError && !isLoading && videos?.length > 0 ? (
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
                    {content}
                  </select>
                ) : (
                  <div>Something went wrong!</div>
                )}

                {isLoading && <div>loading...</div>}
              </div>
            </div>

            <div className="">
              <h4 className="text-lg mb-2 capitalize">options: </h4>

              <div className="bg-purple-400 p-2 mb-2 rounded-md">
                <OptionInput
                  id="option1"
                  title="option one"
                  placeholder="enter your first option..."
                  value={formData.options[0].option}
                  onChange={(e) =>
                    handleOptionChange(e, formData.options[0].id)
                  }
                />
                <Checkbox
                  inputId="checkbox1"
                  title="is correct?"
                  checked={formData.options[0].isCorrect}
                  onChange={(e) => handleCheckbox(e, formData.options[0].id)}
                />
              </div>

              <div className="bg-purple-400 p-2 mb-2 rounded-md">
                <OptionInput
                  id="option2"
                  title="option one"
                  placeholder="enter your second option..."
                  value={formData.options[1].option}
                  onChange={(e) =>
                    handleOptionChange(e, formData.options[1].id)
                  }
                />
                <Checkbox
                  inputId="checkbox2"
                  title="is correct?"
                  checked={formData.options[1].isCorrect}
                  onChange={(e) => handleCheckbox(e, formData.options[1].id)}
                />
              </div>

              <div className="bg-purple-400 p-2 mb-2 rounded-md">
                <OptionInput
                  id="option3"
                  title="option one"
                  placeholder="enter your thired option..."
                  value={formData.options[2].option}
                  onChange={(e) =>
                    handleOptionChange(e, formData.options[2].id)
                  }
                />
                <Checkbox
                  inputId="checkbox3"
                  title="is correct?"
                  checked={formData.options[2].isCorrect}
                  onChange={(e) => handleCheckbox(e, formData.options[2].id)}
                />
              </div>

              <div className="bg-purple-400 p-2 mb-2 rounded-md">
                <OptionInput
                  id="option4"
                  title="option one"
                  placeholder="enter your fourth option..."
                  value={formData.options[3].option}
                  onChange={(e) =>
                    handleOptionChange(e, formData.options[3].id)
                  }
                />
                <Checkbox
                  inputId="checkbox4"
                  title="is correct?"
                  checked={formData.options[3].isCorrect}
                  onChange={(e) => handleCheckbox(e, formData.options[3].id)}
                />
              </div>
            </div>

            <div>
              <button
                disabled={addLoading || editLoading}
                type="submit"
                className="group  relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                {type === "add" ? "Add Quiz" : "Update Quiz"}
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
