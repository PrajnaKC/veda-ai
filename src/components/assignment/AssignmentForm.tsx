"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// Button import removed (unused)
import { Input } from "@/components/common/Input";
import { useAssignmentStore } from "@/store/assignmentStore";
import { useUiStore } from "@/store/uiStore";
import { assignmentCreateSchema } from "@/lib/validators";
import { QuestionRow } from "./QuestionRow";
import { StepIndicator } from "./StepIndicator";
import { UploadBox } from "./UploadBox";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function AssignmentForm() {
  const router = useRouter();
  const { form, setField, setQuestionTypes, loading, setLoading, reset } = useAssignmentStore();
  const setHasCreatedAssignment = useUiStore((state) => state.setHasCreatedAssignment);
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<string>();
  const [step, setStep] = useState<1 | 2>(1);

  const totals = useMemo(
    () =>
      form.questionTypes.reduce(
        (total, item) => ({
          questions: total.questions + item.count,
          marks: total.marks + item.count * item.marks
        }),
        { questions: 0, marks: 0 }
      ),
    [form.questionTypes]
  );

  const handleNextStep = (event: React.MouseEvent) => {
    event.preventDefault();
    setError(undefined);

    // Validate Step 1 fields
    if (!form.dueDate) {
      setError("Please select a Due Date.");
      return;
    }
    if (form.questionTypes.length === 0) {
      setError("At least one question type is required.");
      return;
    }

    setStep(2);
  };

  const handlePreviousStep = (event: React.MouseEvent) => {
    event.preventDefault();
    if (step === 2) {
      setStep(1);
    } else {
      router.push("/assignments");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setLoading(true);

    try {
      const payload = assignmentCreateSchema.parse({
        ...form,
        totalMarks: totals.marks
      });

      const body = new FormData();
      body.append("payload", JSON.stringify(payload));
      if (file) {
        body.append("file", file);
      }

      const response = await fetch("/api/assignments", {
        method: "POST",
        body
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to create assignment");
      }

      await fetch(`/api/generate/${result.data._id}`, {
        method: "POST",
        headers: { "content-type": "application/json" }
      });

      setHasCreatedAssignment(true);
      reset();
      router.push(`/assignments/${result.data._id}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-[810px] mx-auto flex flex-col gap-6 md:gap-8 pb-[100px] md:pb-6 px-1 md:px-0">
        {/* Top Header / Back Button Bar */}
        <div className="flex items-center justify-between gap-4 w-full h-[66px] px-2">
          {/* Back button circle */}
          <button
            type="button"
            onClick={handlePreviousStep}
            className="flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-full border border-white/20 shadow-sm transition active:scale-95 hover:bg-white/50 shrink-0"
            aria-label="Go back"
          >
            <svg className="w-6 h-6 text-[#303030]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Title */}
          <div className="flex-1 flex flex-col justify-center items-start pl-2">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#303030] leading-none mb-1">Create Assignment</h1>
            <p className="text-xs md:text-sm text-[#5E5E5E]/80">Set up a new assignment for your students</p>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="w-full max-w-[810px] px-2">
          <StepIndicator currentStep={step} totalSteps={2} />
        </div>

        {/* Main Form Content Card */}
        <section className="bg-white/50 backdrop-blur-sm shadow-soft rounded-[32px] border border-white/30 p-4 md:p-8 flex flex-col gap-6 md:gap-8 w-full">
          {step === 1 ? (
            /* STEP 1: Assignment Details & Upload */
            <>
              {/* Header Title inside card */}
              <div className="flex flex-col gap-0.5">
                <h2 className="text-xl font-bold text-[#303030]">Assignment Details</h2>
                <p className="text-sm text-[#5E5E5E]/80">Basic information about your assignment</p>
              </div>

              {/* Upload Section */}
              <div className="w-full">
                <UploadBox file={file} onFileChange={setFile} />
              </div>

              {/* Due Date Section */}
              <div className="flex flex-col gap-2 w-full">
                <label className="text-base font-bold text-[#303030]">Due Date</label>
                <div className="relative flex items-center w-full">
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(event) => setField("dueDate", event.target.value)}
                    required
                    className="w-full rounded-full border border-[#DADADA] bg-white px-4 py-2.5 pr-10 focus:ring-2 focus:ring-neutral-400 h-11 text-[#303030] font-semibold text-sm cursor-pointer"
                  />
                  <span className="absolute right-4 pointer-events-none">
                    <svg className="w-5 h-5 text-[#2B2B2B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 3v4M8 3v4M4 11h16M12 15v-2m0 0v2m0-2h2m-2 0H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Question Type Section */}
              <div className="flex flex-col gap-4 w-full">
                <label className="text-base font-bold text-[#303030]">Question Type</label>

                {/* Column Headers (Desktop only) */}
                <div className="hidden md:grid grid-cols-[1fr_24px_132px_132px] gap-4 px-3 text-sm font-semibold text-[#5E5E5E] select-none">
                  <div>Question Type</div>
                  <div className="w-[24px]"></div>
                  <div className="text-center">No. of Questions</div>
                  <div className="text-center">Marks</div>
                </div>

                {/* Row List */}
                <div className="flex flex-col gap-3 md:gap-2">
                  {form.questionTypes.map((questionType, index) => (
                    <QuestionRow
                      key={`${questionType.type}-${index}`}
                      value={questionType}
                      canRemove={form.questionTypes.length > 1}
                      onChange={(nextValue) => {
                        const next = [...form.questionTypes];
                        next[index] = nextValue;
                        setQuestionTypes(next);
                      }}
                      onRemove={() => setQuestionTypes(form.questionTypes.filter((_, rowIndex) => rowIndex !== index))}
                    />
                  ))}
                </div>

                {/* Add Question Button & Summary Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setQuestionTypes([...form.questionTypes, { type: "Short Questions", count: 1, marks: 1 }])}
                    className="flex items-center gap-3 transition active:scale-95 text-left w-fit"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#2B2B2B] flex items-center justify-center shadow-sm shrink-0">
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="font-bold text-sm text-[#303030]">Add Question Type</span>
                  </button>

                  <div className="flex flex-col gap-1 text-right text-base font-semibold text-[#303030]">
                    <p>Total Questions : {totals.questions}</p>
                    <p>Total Marks : {totals.marks}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <label className="text-base font-bold text-[#303030]">Additional Information (For better output)</label>
                <div className="relative">
                  <textarea
                    value={form.instructions}
                    onChange={(event) => setField("instructions", event.target.value)}
                    className="w-full min-h-[96px] rounded-3xl border border-[#DADADA] bg-white px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-neutral-400 resize-none font-medium text-[#303030]"
                    placeholder="e.g. Generate a question paper for 3 hour exam duration..."
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-[#F6F6F6] text-[#FF5623] shadow hover:bg-neutral-100 transition active:scale-95"
                    aria-label="Voice input"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* STEP 2: General Metadata Details */
            <>
              <div className="flex flex-col gap-0.5">
                <h2 className="text-xl font-bold text-[#303030]">General Details</h2>
                <p className="text-sm text-[#5E5E5E]/80">Fill in the metadata to create and generate the assignment</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Title"
                  value={form.title}
                  onChange={(event) => setField("title", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Institution Name"
                  value={form.institutionName}
                  onChange={(event) => setField("institutionName", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Department"
                  value={form.department}
                  onChange={(event) => setField("department", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Subject"
                  value={form.subject}
                  onChange={(event) => setField("subject", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Course Code"
                  value={form.courseCode}
                  onChange={(event) => setField("courseCode", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Exam Type"
                  value={form.examType}
                  onChange={(event) => setField("examType", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Semester / Class"
                  value={form.semester}
                  onChange={(event) => setField("semester", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
                <Input
                  label="Duration"
                  value={form.duration}
                  onChange={(event) => setField("duration", event.target.value)}
                  required
                  className="rounded-full border-[#DADADA] px-4 py-2.5 h-11 text-sm font-semibold text-[#303030]"
                />
              </div>
            </>
          )}

          {error ? <p className="text-sm text-red-700 font-semibold mt-2">{error}</p> : null}
        </section>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-4 w-full mt-4 px-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePreviousStep}
            className="px-6 py-2.5 rounded-full border border-[#DADADA] bg-white text-[#303030] font-semibold text-sm shadow-sm transition active:scale-95 hover:bg-neutral-50"
          >
            ← Previous
          </button>

          {/* Next / Submit Button */}
          {step === 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-full bg-[#2B2B2B] text-white font-semibold text-sm shadow-md transition active:scale-95 hover:bg-neutral-800"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-[#2B2B2B] text-white font-semibold text-sm shadow-md transition active:scale-95 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Creating..." : "Create & Generate →"}
            </button>
          )}
        </div>
      </form>

      {/* Mobile Bottom Tab Nav */}
      <MobileBottomNav />
    </div>
  );
}
