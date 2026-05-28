"use client";

import { useEffect } from "react";
import type { Assignment } from "@/types/assignment";
import { Button } from "@/components/common/Button";
import { useSocketStore } from "@/store/socketStore";
import { QuestionPaper } from "./QuestionPaper";
import { ResponseBanner } from "@/components/ResponseBanner";
import type { QuestionPaperData, QuestionDifficulty } from "@/data/questionPaper";

type BackendGeneratedPaperQuestion = {
  questionNumber?: number;
  question?: string;
  text?: string;
  difficulty?: string;
  marks?: number;
};

type PaperQuestion = BackendGeneratedPaperQuestion & {
  type?: "mcq" | "oneword" | "short" | "long" | "numerical" | "diagram" | "case";
  options?: string[];
  answer: string;
  meta?: Record<string, unknown>;
  prompt?: string;
};

type ResolvedQuestion = {
  id: number;
  difficulty: QuestionDifficulty;
  text: string;
  marks: number;
  answer: string;
  type?: string;
  options?: string[];
  meta?: Record<string, unknown>;
};

type CaseMeta = {
  caseText?: string;
  subQuestions?: PaperQuestion[];
};

type BackendGeneratedPaperSection = {
  title?: string;
  instruction?: string;
  questions?: BackendGeneratedPaperQuestion[];
};

type BackendGeneratedPaper = {
  sections?: BackendGeneratedPaperSection[];
};

type OutputPaperProps = {
  assignment: Assignment;
  generatedPaper?: BackendGeneratedPaper | null;
};

function normalizeDifficulty(difficulty?: string) {
  const normalized = difficulty?.trim().toLowerCase();

  if (normalized === "hard") {
    return "Challenging";
  }

  if (normalized === "medium" || normalized === "moderate") {
    return "Moderate";
  }

  return "Easy";
}

function resolvePaperSections(paper?: Assignment["generatedPaper"] | BackendGeneratedPaper | null) {
  return (paper?.sections || []).map((sec, idx) => ({
    id: `section-${idx}`,
    title: sec.title || `Section ${idx + 1}`,
    subtitle: sec.title?.toLowerCase().includes("section") ? "Questions" : sec.title || "Questions",
    helperText: sec.instruction || "All questions are compulsory.",
    questions: (() => {
      const out: ResolvedQuestion[] = [];
      (sec.questions || []).forEach((q) => {
        const qq = q as PaperQuestion;
        const qType = qq.type as string | undefined;
        const parsedQNum = typeof qq.questionNumber === "number" ? qq.questionNumber : (qq.questionNumber ? Number(qq.questionNumber) : NaN);
        const baseId = Number.isFinite(parsedQNum) ? (parsedQNum as number) : out.length + 1;
        const base: ResolvedQuestion = {
          id: baseId,
          difficulty: normalizeDifficulty(qq.difficulty),
          text: qq.text || qq.question || "",
          marks: qq.marks || 0,
          answer: qq.answer || "",
          type: qType,
          options: Array.isArray(qq.options) ? qq.options : undefined,
          meta: qq.meta as Record<string, unknown> | undefined,
        };

        if (qType === "case") {
          const caseMeta = qq.meta as CaseMeta | undefined;
          if (caseMeta && Array.isArray(caseMeta.subQuestions)) {
            // push the case stem first (include case text if provided)
            const caseStemText = [base.text, caseMeta.caseText].filter(Boolean).join("\n\n");
            out.push({ ...base, text: caseStemText, marks: qq.marks || 0 });

            // then push each sub-question as individual numbered questions
            caseMeta.subQuestions.forEach((sub) => {
              const subQNum = typeof sub.questionNumber === "number" ? sub.questionNumber : (sub.questionNumber ? Number(sub.questionNumber) : NaN);
              const subId = Number.isFinite(subQNum) ? subQNum : out.length + 1;
              out.push({
                id: subId,
                difficulty: normalizeDifficulty(sub.difficulty || qq.difficulty),
                text: sub.text || sub.question || sub.prompt || "",
                marks: sub.marks || 0,
                answer: sub.answer || "",
                type: sub.type || "short",
                options: Array.isArray(sub.options) ? sub.options : undefined,
                meta: sub.meta || undefined,
              });
            });
          } else {
            out.push(base);
          }
        } else {
          out.push(base);
        }
      });

      return out;
    })(),
  }));
}

export function OutputPaper({ assignment, generatedPaper }: OutputPaperProps) {
  const { connect, disconnect, realtimeStatus } = useSocketStore();
  const latestPaper = realtimeStatus?.generatedPaper || generatedPaper || assignment.generatedPaper;
  const latestStatus = realtimeStatus?.status || assignment.status;

  useEffect(() => {
    connect(assignment._id);
    return () => disconnect();
  }, [assignment._id, connect, disconnect]);

  useEffect(() => {
    // Debug logging to help diagnose missing paper rendering
    // eslint-disable-next-line no-console
    console.debug("OutputPaper debug:", { assignment, generatedPaper, realtimeStatus, latestPaper });
  }, [assignment, generatedPaper, realtimeStatus, latestPaper]);

  // Construct the structured paper data from the database assignment schema
  const mappedSections = resolvePaperSections(latestPaper);

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
    sections: mappedSections,
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
          {mappedSections.length === 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="font-semibold text-yellow-800 mb-2">Developer debug: No sections found</p>
              <pre className="text-xs max-h-52 overflow-auto text-neutral-800">{JSON.stringify({ assignment, latestPaper }, null, 2)}</pre>
            </div>
          )}
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
