"use client";

import { create } from "zustand";
import { questionPaperData, type QuestionPaperData } from "@/data/questionPaper";
import { downloadQuestionPaperPdf } from "@/lib/pdf/questionPaperPdf";

type DownloadState = "idle" | "loading" | "success" | "error";

type QuestionPaperStore = {
  paperData: QuestionPaperData;
  downloadState: DownloadState;
  loading: boolean;
  setPaperData: (paperData: QuestionPaperData) => void;
  downloadPDF: () => Promise<void>;
};

export const useQuestionPaperStore = create<QuestionPaperStore>((set, get) => ({
  paperData: questionPaperData,
  downloadState: "idle",
  loading: false,
  setPaperData: (paperData) => set({ paperData }),
  downloadPDF: async () => {
    const { paperData, loading } = get();

    if (loading) {
      return;
    }

    set({ loading: true, downloadState: "loading" });

    try {
      await downloadQuestionPaperPdf(paperData);
      set({ downloadState: "success" });
    } catch {
      set({ downloadState: "error" });
    } finally {
      set({ loading: false });
    }
  }
}));
