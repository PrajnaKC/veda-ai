"use client";


import Link from "next/link";
import { MockAssignment } from "@/store/uiStore";
import { Button } from "@/components/common/Button";
import { AssignmentCard } from "./AssignmentCard";
import { EmptyState } from "./EmptyState";
import { FilterBar } from "./FilterBar";

export function AssignmentsDashboard({ assignments }: { assignments: MockAssignment[] }) {
  if (assignments.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid gap-10 max-w-5xl mx-auto py-8 px-2 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-1">Assignments</h1>
          <p className="text-base text-neutral-600">Manage and create assignments for your classes.</p>
        </div>
        <Link href="/assignments/create">
          <Button className="px-6 py-2 text-lg rounded-full">Create Assignment</Button>
        </Link>
      </div>
      <FilterBar />
      <div className="grid gap-6 sm:grid-cols-2">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </section>
  );
}

