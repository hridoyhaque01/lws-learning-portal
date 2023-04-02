import React from "react";
import Navigation from "../../components/Navigation";
import AssignmentMarkContent from "../../components/assignment-mark/AssignmentMarkContent";

export default function AssignmentMark() {
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AssignmentMarkContent />
        </div>
      </section>
    </>
  );
}
