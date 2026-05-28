"use client";

import { create } from "zustand";

export interface MockAssignment {
  id: string;
  title: string;
  assignedOn: string;
  dueDate: string;
  status?: "draft" | "queued" | "generating" | "completed" | "failed";
}

type UiState = {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  selectedNav: string;
  activeMobileTab: string;
  modalOpen: boolean;
  selectedAssignmentId?: string;
  // Assignment specific state
  selectedAssignment: MockAssignment | null;
  dropdownOpenId: string | null;
  searchQuery: string;
  filterValue: string;
  hasCreatedAssignment: boolean;
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setSelectedNav: (selectedNav: string) => void;
  setActiveMobileTab: (activeMobileTab: string) => void;
  setModalOpen: (open: boolean) => void;
  setSelectedAssignmentId: (id?: string) => void;
  // Assignment specific actions
  setSelectedAssignment: (assignment: MockAssignment | null) => void;
  setDropdownOpenId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterValue: (value: string) => void;
  setHasCreatedAssignment: (hasCreatedAssignment: boolean) => void;
  resetAssignmentFilters: () => void;
  closeDropdown: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  mobileMenuOpen: false,
  selectedNav: "Assignments",
  activeMobileTab: "Assignments",
  modalOpen: false,
  selectedAssignmentId: undefined,
  // Assignment defaults
  selectedAssignment: null,
  dropdownOpenId: null,
  searchQuery: "",
  filterValue: "All",
  hasCreatedAssignment: false,
  // Action implementation
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setSelectedNav: (selectedNav) => set({ selectedNav }),
  setActiveMobileTab: (activeMobileTab) => set({ activeMobileTab }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
  setSelectedAssignmentId: (selectedAssignmentId) => set({ selectedAssignmentId }),
  // Assignment actions implementation
  setSelectedAssignment: (selectedAssignment) => set({ selectedAssignment }),
  setDropdownOpenId: (dropdownOpenId) => set({ dropdownOpenId }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setFilterValue: (filterValue) => set({ filterValue }),
  setHasCreatedAssignment: (hasCreatedAssignment) => set({ hasCreatedAssignment }),
  resetAssignmentFilters: () => set({ searchQuery: "", filterValue: "All" }),
  closeDropdown: () => set({ dropdownOpenId: null })
}));

