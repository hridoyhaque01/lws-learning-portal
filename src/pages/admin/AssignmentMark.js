import React from "react";
import Navigation from "../../components/Navigation";
import AssignmentMarkTable from "../../components/table-components/tables/AssignmentMarkTable";

export default function AssignmentMark() {
  return (
    <>
      <Navigation />

      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <AssignmentMarkTable />
        </div>
      </section>
    </>
  );
}
