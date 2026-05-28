import { jsPDF } from "jspdf";
import type { Assignment } from "@/types/assignment";

export function createAssignmentPdf(assignment: Assignment) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  let y = margin;

  const write = (text: string, size = 11, lineGap = 18) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, 500);
    doc.text(lines, margin, y);
    y += lines.length * lineGap;
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  write(assignment.institutionName, 18, 22);
  doc.setFont("helvetica", "normal");
  write(`${assignment.subject} | ${assignment.courseCode} | ${assignment.semester}`);
  write(`Duration: ${assignment.duration}    Maximum Marks: ${assignment.totalMarks}`);
  write("Name: ____________________  Roll Number: ____________________  Section: ______");
  write(assignment.instructions || "All questions are compulsory unless stated otherwise.");

  assignment.generatedPaper?.sections.forEach((section, sectionIndex) => {
    doc.setFont("helvetica", "bold");
    write(section.title || `Section ${sectionIndex + 1}`, 14, 20);
    doc.setFont("helvetica", "italic");
    write(section.instruction, 10);
    doc.setFont("helvetica", "normal");

    section.questions.forEach((question, questionIndex) => {
      write(
        `${questionIndex + 1}. [${question.difficulty}] ${question.text} [${question.marks} Marks]`,
        11,
        16
      );
    });
  });

  return Buffer.from(doc.output("arraybuffer"));
}
