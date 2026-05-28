"use client";

import { create } from "zustand";
import type { Assignment, AssignmentFormInput, GeneratedPaper, QuestionType, UploadedFile } from "@/types/assignment";

const defaultQuestionTypes: QuestionType[] = [
  { type: "Multiple Choice Questions", count: 4, marks: 1 }
];

type AssignmentState = {
  form: AssignmentFormInput;
  generatedPaper?: GeneratedPaper;
  loading: boolean;
  generationStatus: Assignment["status"];
  setField: <K extends keyof AssignmentFormInput>(key: K, value: AssignmentFormInput[K]) => void;
  setQuestionTypes: (questionTypes: QuestionType[]) => void;
  setUploadedFile: (uploadedFile?: UploadedFile) => void;
  setGeneratedPaper: (paper?: GeneratedPaper) => void;
  setLoading: (loading: boolean) => void;
  setGenerationStatus: (status: Assignment["status"]) => void;
  reset: () => void;
};

const initialForm: AssignmentFormInput = {
  title: "",
  institutionName: "",
  collegeName: "",
  department: "",
  subject: "",
  courseCode: "",
  examType: "",
  semester: "",
  duration: "",
  totalMarks: 1,
  dueDate: "",
  instructions: "",
  questionTypes: defaultQuestionTypes
};

export const useAssignmentStore = create<AssignmentState>((set) => ({
  form: initialForm,
  loading: false,
  generationStatus: "queued",
  setField: (key, value) =>
    set((state) => ({
      form: { ...state.form, [key]: value }
    })),
  setQuestionTypes: (questionTypes) =>
    set((state) => ({
      form: { ...state.form, questionTypes }
    })),
  setUploadedFile: (uploadedFile) =>
    set((state) => ({
      form: { ...state.form, uploadedFile }
    })),
  setGeneratedPaper: (generatedPaper) => set({ generatedPaper }),
  setLoading: (loading) => set({ loading }),
  setGenerationStatus: (generationStatus) => set({ generationStatus }),
  reset: () =>
    set({
      form: initialForm,
      generatedPaper: undefined,
      loading: false,
      generationStatus: "queued"
    })
}));
