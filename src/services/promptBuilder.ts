import type { Assignment } from "../types/assignment.ts";

export function buildGenerationPrompt(assignment: Assignment) {
  const questionPlan = assignment.questionTypes
    .map((item) => `- ${item.type}: ${item.count} questions, ${item.marks} marks each`)
    .join("\n");

  const materialContext = assignment.uploadedFile?.extractedText
    ? `\nStudy material context:\n${assignment.uploadedFile.extractedText.slice(0, 18000)}`
    : "\nNo uploaded study material was provided.";

  return `
You are generating question content for a teacher assessment platform.

Return ONLY valid JSON. Do not return markdown. Do not return explanations.
The backend owns paper layout, student information, headers, and formatting.
Generate only question content matching this exact schema:
{
  "sections": [
    {
      "title": "",
      "instruction": "",
      "questions": [
        {
          "text": "",
          "difficulty": "easy|medium|hard",
          "marks": 1,
          "type": "mcq|oneword|short|long|numerical|diagram|case",
          "options": ["option1", "option2"], // include only when type is mcq
          "answer": "", // optional canonical answer for one-word/short/mcq/numerical
          "meta": { "diagramHint": "", "units": "", "caseText": "", "subQuestions": [] } // optional type-specific metadata
        }
      ]
    }
  ]
}

Assignment details:
Title: ${assignment.title}
Institution: ${assignment.institutionName}
Department: ${assignment.department}
Subject: ${assignment.subject}
Course Code: ${assignment.courseCode}
Exam Type: ${assignment.examType}
Semester/Class: ${assignment.semester}
Duration: ${assignment.duration}
Total Marks: ${assignment.totalMarks}
Teacher Instructions: ${assignment.instructions || "None"}

Question plan:
${questionPlan}
${materialContext}

Rules:
- Create sections based on the question plan.
- Each section question count and marks must match the plan.
- Use difficulty values exactly as easy, medium, or hard.
- Keep questions clear, assessment-ready, and appropriate for the subject.
`.trim();
}
