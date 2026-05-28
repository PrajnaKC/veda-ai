"use client";

import { useEffect, useMemo, useState } from "react";
import { filterAssignments } from "@/lib/filterAssignments";
import { useUiStore } from "@/store/uiStore";
import type { MockAssignment } from "@/store/uiStore";

type AssignmentsResponse = {
  data: Array<{
    _id: string;
    title: string;
    dueDate: string;
    createdAt: string;
    status: MockAssignment["status"];
  }>;
};

export function useFilteredAssignments() {
  const { searchQuery, filterValue } = useUiStore();
  const [assignments, setAssignments] = useState<MockAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAssignments() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/assignments", { signal: controller.signal, cache: "no-store" });
        const result = (await response.json()) as AssignmentsResponse & { error?: string };

        if (!response.ok) {
          throw new Error(result.error || "Failed to load assignments");
        }

        const mappedAssignments = result.data.map((assignment) => ({
          id: assignment._id,
          title: assignment.title,
          assignedOn: new Date(assignment.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }),
          dueDate: new Date(assignment.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          }),
          status: assignment.status
        }));

        setAssignments(mappedAssignments);
      } catch (assignmentError) {
        if ((assignmentError as Error).name !== "AbortError") {
          setError(assignmentError instanceof Error ? assignmentError.message : "Failed to load assignments");
        }
      } finally {
        setLoading(false);
      }
    }

    void loadAssignments();

    return () => controller.abort();
  }, []);

  const filteredAssignments = useMemo(
    () => filterAssignments(assignments, searchQuery, filterValue),
    [assignments, searchQuery, filterValue]
  );

  return {
    assignments: filteredAssignments,
    loading,
    error
  };
}
