import type { MockAssignment } from "@/store/uiStore";

export function filterAssignments(
  assignments: MockAssignment[],
  searchQuery: string,
  filterValue: string
): MockAssignment[] {
  return assignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesFilter =
      filterValue === "All" ||
      (filterValue === "Active" && assignment.status !== "completed");

    return matchesSearch && matchesFilter;
  });
}
