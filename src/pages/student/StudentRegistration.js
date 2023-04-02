import React from "react";
import learningProtal from "../../assets/image/learningportal.svg";
import SignupForm from "../../components/forms/SignupForm";

export default function StudentRegistration() {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src={learningProtal}
            alt="learning portal"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
