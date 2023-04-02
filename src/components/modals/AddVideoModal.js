import React from "react";

export default function AddVideoModal({ open, control }) {
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <h2 className=" text-center text-3xl font-extrabold text-white">
            এসাইনমেন্ট জমা দিন
          </h2>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-px">
              <div className="flex flex-col space-y-2">
                <label htmlFor="to">গিটহাব রিপোসিটরি লিঙ্ক *</label>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-3 py-3  placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm bg-slate-800"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group  relative w-full flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                এসাইনমেন্ট জমা দিন
              </button>
            </div>

            {/* {participant?.length === 0 && (
              <Error message="This user does not exist!" />
            )}
            {participant?.length > 0 && participant[0].email === myEmail && (
              <Error message="You can not send message to yourself!" />
            )}

            {responseError && <Error message={responseError} />} */}
          </form>
        </div>
      </>
    )
  );
}
