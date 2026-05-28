"use client";

import { useEffect } from "react";
import type { Assignment } from "@/types/assignment";
import { Button } from "@/components/common/Button";
import { useSocketStore } from "@/store/socketStore";
import { QuestionPaper } from "./QuestionPaper";
import { ResponseBanner } from "@/components/ResponseBanner";
import type { QuestionPaperData } from "@/data/questionPaper";

export function OutputPaper({ assignment }: { assignment: Assignment }) {
  const { connect, disconnect, realtimeStatus } = useSocketStore();
  const latestPaper = realtimeStatus?.generatedPaper || assignment.generatedPaper;
  const latestStatus = realtimeStatus?.status || assignment.status;

  useEffect(() => {
    connect(assignment._id);
    return () => disconnect();
  }, [assignment._id, connect, disconnect]);

  // Construct the structured paper data from the database assignment schema
  const mappedSections = (latestPaper?.sections || []).map((sec) => ({
    title: sec.title || "Section",
    subtitle: sec.title.toLowerCase().includes("section") ? "Questions" : sec.title,
    instruction: sec.instruction || "All questions are compulsory.",
    questions: (sec.questions || []).map((q) => ({
      text: q.text,
      difficulty: q.difficulty,
      marks: q.marks,
    })),
  }));

  const instructionsList = assignment.instructions
    ? assignment.instructions.split("\n").filter((i) => i.trim().length > 0)
    : ["All questions are compulsory unless stated otherwise."];

  // Map to QuestionPaperData structure to feed the PDF export inside ResponseBanner
  const paperDataForBanner: QuestionPaperData = {
    school: assignment.institutionName || "Institution Name",
    subject: assignment.subject,
    className: assignment.semester,
    timeAllowed: assignment.duration,
    maximumMarks: assignment.totalMarks,
    responseMessage: realtimeStatus?.message || "Certainly! Here is your customized question paper.",
    sections: (latestPaper?.sections || []).map((sec, idx) => ({
      id: `section-${idx}`,
      title: sec.title,
      subtitle: sec.title.toLowerCase().includes("section") ? "Questions" : sec.title,
      helperText: sec.instruction || "All questions are compulsory.",
      questions: (sec.questions || []).map((q, qidx) => ({
        id: qidx + 1,
        difficulty: q.difficulty.toLowerCase().trim() === "hard" ? "Challenging" : q.difficulty.toLowerCase().trim() === "medium" ? "Moderate" : "Easy",
        text: q.text,
        marks: q.marks,
        answer: "",
      })),
    })),
    questions: [],
    answerKey: [],
    fileName: `${(assignment.institutionName || "exam").replace(/[^a-z0-9]/gi, "_").toLowerCase()}_exam.pdf`,
  };

  return (
    <div className="w-full min-h-screen bg-[#5E5E5E] py-8 px-4 flex flex-col gap-6 items-center justify-start">
      {/* Status & Control Banner */}
      <div className="w-full max-w-[1060px] rounded-[24px] sm:rounded-[32px] border border-neutral-700 bg-neutral-900/90 text-white p-6 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="font-semibold text-[16px] text-neutral-200">
            Generation Status:{" "}
            <span className="font-bold text-[#FF5623] capitalize">
              {latestStatus}
            </span>
          </p>
          {realtimeStatus?.message ? (
            <p className="text-sm text-neutral-400 mt-1">
              {realtimeStatus.message}
            </p>
          ) : (
            latestStatus === "processing" && (
              <p className="text-sm text-neutral-400 mt-1">
                Creating your assessment. Please wait...
              </p>
            )
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            className="rounded-full px-6"
            onClick={() =>
              fetch(`/api/regenerate/${assignment._id}`, {
                method: "POST",
              })
            }
          >
            Regenerate Paper
          </Button>
        </div>
      </div>

      {/* Main Question Paper Container */}
      {latestStatus === "completed" || latestPaper?.sections?.length ? (
        <div className="w-full max-w-[1060px] flex flex-col gap-5">
          {/* Dark AI Response Banner */}
          <ResponseBanner
            text={realtimeStatus?.message || "Certainly! Here is your customized question paper."}
            paperData={paperDataForBanner}
          />
          
          {/* White Exam Sheet */}
          <QuestionPaper
            schoolName={assignment.institutionName || "Institution Name"}
            examTitle={assignment.examType || "Assessment Examination"}
            subject={assignment.subject}
            className={assignment.semester}
            duration={assignment.duration}
            maximumMarks={assignment.totalMarks}
            instructions={instructionsList}
            sections={mappedSections}
          />
        </div>
      ) : (
        <div className="w-full max-w-[1060px] bg-white rounded-[24px] sm:rounded-[32px] p-12 text-center shadow-lg border border-neutral-200">
          {latestStatus === "failed" ? (
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Generation Failed</h3>
              <p className="text-neutral-500 mb-4">
                An error occurred while generating your question paper. Please try regenerating.
              </p>
              <Button
                type="button"
                onClick={() =>
                  fetch(`/api/regenerate/${assignment._id}`, {
                    method: "POST",
                  })
                }
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
              <p className="text-neutral-600 font-medium">
                VedaAI is building your question paper...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
