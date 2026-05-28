import { jsPDF } from "jspdf";
import type { QuestionPaperData, QuestionPaperSection } from "@/data/questionPaper";

function wrapText(doc: jsPDF, text: string, maxWidth: number) {
  return doc.splitTextToSize(text, maxWidth) as string[];
}

function ensurePageSpace(doc: jsPDF, currentY: number, requiredSpace: number, margin: number) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (currentY + requiredSpace <= pageHeight - margin) {
    return currentY;
  }

  doc.addPage();
  return margin;
}

function writeWrappedParagraph(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  fontSize: number,
  fontStyle: "normal" | "bold" = "normal"
) {
  doc.setFont("helvetica", fontStyle);
  doc.setFontSize(fontSize);

  const lines = wrapText(doc, text, maxWidth);

  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });

  return y;
}

function writeQuestionList(doc: jsPDF, section: QuestionPaperSection, x: number, y: number, maxWidth: number) {
  section.questions.forEach((question) => {
    y = ensurePageSpace(doc, y, 42, 36);
    const questionText = `${question.id}. [${question.difficulty}] ${question.text} [${question.marks} Marks]`;
    const lines = wrapText(doc, questionText, maxWidth);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    lines.forEach((line) => {
      doc.text(line, x, y);
      y += 16;
    });

    y += 6;
  });

  return y;
}

export async function downloadQuestionPaperPdf(paperData: QuestionPaperData) {
  const doc = new jsPDF({ format: "a4", unit: "pt", orientation: "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  doc.setTextColor(43, 43, 43);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(paperData.school, pageWidth / 2, y, { align: "center" });
  y += 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(`Subject: ${paperData.subject}`, pageWidth / 2, y, { align: "center" });
  y += 16;
  doc.text(`Class: ${paperData.className}`, pageWidth / 2, y, { align: "center" });
  y += 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Time Allowed: ${paperData.timeAllowed}`, margin, y);
  doc.text(`Maximum Marks: ${paperData.maximumMarks}`, pageWidth - margin, y, { align: "right" });
  y += 22;

  y = writeWrappedParagraph(
    doc,
    "All questions are compulsory unless stated otherwise.",
    margin,
    y,
    contentWidth,
    15,
    11,
    "normal"
  );
  y += 18;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Name: ____________________", margin, y);
  y += 14;
  doc.text("Roll Number: ______________", margin, y);
  y += 14;
  doc.text(`Class: ${paperData.className} Section: ____________`, margin, y);
  y += 34;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(paperData.sections[0]?.title ?? "Section A", pageWidth / 2, y, { align: "center" });
  y += 24;

  paperData.sections.forEach((section) => {
    y = ensurePageSpace(doc, y, 70, margin);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(section.subtitle, margin, y);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    y = writeWrappedParagraph(doc, section.helperText, margin, y, contentWidth, 12, 9, "normal");
    y += 8;

    y = writeQuestionList(doc, section, margin, y, contentWidth);
  });

  y = ensurePageSpace(doc, y, 30, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("End of Question Paper", margin, y);
  y += 24;

  y = ensurePageSpace(doc, y, 36, margin);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Answer Key:", margin, y);
  y += 18;

  paperData.answerKey.forEach((entry) => {
    y = ensurePageSpace(doc, y, 40, margin);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const lines = wrapText(doc, `${entry.id}. ${entry.answer}`, contentWidth);
    lines.forEach((line) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 15;
    });
    y += 4;
  });

  doc.save(paperData.fileName);
}
