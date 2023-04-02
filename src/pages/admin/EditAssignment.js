import React from "react";
import EditAssignmentForm from "../../components/forms/EditAssignmentForm";
import Navigation from "../../components/Navigation";

export default function EditAssignment() {
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto lg:w-[600px] px-5 lg:px-0">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
              Edit Assignment
            </h2>
          </div>
          <EditAssignmentForm />
        </div>
      </section>
    </>
  );
}
