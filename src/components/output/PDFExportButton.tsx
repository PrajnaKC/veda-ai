"use client";

import { useEffect, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { Download, Loader2 } from "lucide-react";
import type { DifficultyType } from "./DifficultyBadge";

// Helper styles for react-pdf
const reactPdfModule = () => import("@react-pdf/renderer");

// Dynamically import PDFDownloadLink to prevent Next.js SSR issues
const PDFDownloadLink = dynamic(
  () => reactPdfModule().then((m) => m.PDFDownloadLink),
  { ssr: false }
);

type PDFQuestion = {
  text: string;
  difficulty: DifficultyType;
  marks: number;
};

type PDFSection = {
  title: string;
  subtitle?: string;
  instruction?: string;
  questions: PDFQuestion[];
};

type PDFAnswerKey = {
  id: number | string;
  answer: string;
};

type QuestionPaperPDFProps = {
  schoolName: string;
  schoolLogo?: string;
  examTitle?: string;
  subject: string;
  className: string;
  duration: string;
  maximumMarks: string | number;
  instructions: string[];
  sections: PDFSection[];
  answerKey?: PDFAnswerKey[];
};

// Create a component that renders the PDF Document using @react-pdf/renderer
async function getPdfDocumentComponent() {
  const { Document, Page, Text, View, StyleSheet } = await reactPdfModule();

  const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 10,
      color: "#2B2B2B",
      lineHeight: 1.5,
    },
    header: {
      alignItems: "center",
      borderBottomWidth: 1.5,
      borderBottomColor: "#1A1A1A",
      paddingBottom: 8,
      marginBottom: 10,
    },
    schoolName: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      color: "#1A1A1A",
      marginBottom: 4,
    },
    examTitle: {
      fontSize: 13,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      color: "#2D2D2D",
      marginBottom: 4,
    },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#000",
      paddingVertical: 5,
      marginVertical: 8,
    },
    metaText: {
      fontSize: 11,
      fontWeight: "bold",
    },
    instructionsContainer: {
      marginVertical: 6,
    },
    instructionsTitle: {
      fontSize: 10,
      fontWeight: "bold",
      marginBottom: 3,
    },
    instructionItem: {
      fontSize: 9,
      marginBottom: 2,
      color: "#3D3D3D",
    },
    studentInfo: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#CCCCCC",
      borderRadius: 6,
      padding: 8,
      marginVertical: 10,
    },
    studentField: {
      flex: 1,
      flexDirection: "row",
      alignItems: "baseline",
      marginRight: 10,
    },
    studentLabel: {
      fontWeight: "bold",
      fontSize: 9,
      marginRight: 4,
      color: "#3D3D3D",
    },
    studentLine: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: "#999999",
    },
    sectionBlock: {
      marginVertical: 12,
    },
    sectionHeader: {
      alignItems: "center",
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#1A1A1A",
    },
    sectionSubtitle: {
      fontSize: 11,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "#3D3D3D",
      marginTop: 2,
    },
    sectionInstruction: {
      fontSize: 9.5,
      fontStyle: "italic",
      color: "#5E5E5E",
      marginTop: 2,
    },
    questionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingVertical: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: "#EEEEEE",
    },
    questionContent: {
      flexDirection: "row",
      flex: 1,
      marginRight: 12,
    },
    badgeContainer: {
      marginRight: 6,
      marginTop: 1,
    },
    badgeText: {
      fontSize: 7,
      fontWeight: "bold",
      paddingHorizontal: 4,
      paddingVertical: 1.5,
      borderRadius: 4,
      borderWidth: 0.5,
      textTransform: "uppercase",
      textAlign: "center",
    },
    badgeEasy: {
      backgroundColor: "#F0FDF4",
      borderColor: "#BBF7D0",
      color: "#166534",
    },
    badgeModerate: {
      backgroundColor: "#FFFAF0",
      borderColor: "#FFE4B5",
      color: "#D97706",
    },
    badgeHard: {
      backgroundColor: "#FEF2F2",
      borderColor: "#FCA5A5",
      color: "#991B1B",
    },
    questionNumber: {
      fontWeight: "bold",
      fontSize: 10,
      marginRight: 6,
    },
    questionText: {
      fontSize: 10,
      flex: 1,
      color: "#2D2D2D",
    },
    questionMarks: {
      fontSize: 9.5,
      fontWeight: "bold",
      color: "#4A4A4A",
    },
    answerKeyContainer: {
      marginTop: 20,
      borderTopWidth: 1.5,
      borderTopColor: "#999999",
      borderStyle: "dashed",
      paddingTop: 15,
    },
    answerKeyTitle: {
      fontSize: 13,
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      marginBottom: 10,
      color: "#1A1A1A",
    },
    answerRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    answerNumber: {
      fontSize: 10,
      fontWeight: "bold",
      marginRight: 6,
      width: 18,
    },
    answerText: {
      fontSize: 10,
      flex: 1,
      color: "#3D3D3D",
    },
  });

  return function GeneratedDocument({
    schoolName,
    examTitle,
    subject,
    className,
    duration,
    maximumMarks,
    instructions,
    sections,
    answerKey,
  }: QuestionPaperPDFProps) {
    let globalQuestionIndex = 1;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.schoolName}>{schoolName}</Text>
            {examTitle && <Text style={styles.examTitle}>{examTitle}</Text>}
            <View style={{ flexDirection: "row", marginTop: 2 }}>
              <Text style={{ fontWeight: "bold" }}>Subject: </Text>
              <Text>{subject}    |    </Text>
              <Text style={{ fontWeight: "bold" }}>Class: </Text>
              <Text>{className}</Text>
            </View>
          </View>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>Time Allowed: {duration}</Text>
            <Text style={styles.metaText}>Maximum Marks: {maximumMarks}</Text>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>Instructions:</Text>
            <Text style={styles.instructionItem}>
              • All questions are compulsory unless stated otherwise.
            </Text>
            {instructions.map((inst, idx) => (
              <Text key={idx} style={styles.instructionItem}>
                • {inst}
              </Text>
            ))}
          </View>

          {/* Student Info */}
          <View style={styles.studentInfo}>
            <View style={styles.studentField}>
              <Text style={styles.studentLabel}>Name:</Text>
              <View style={styles.studentLine} />
            </View>
            <View style={styles.studentField}>
              <Text style={styles.studentLabel}>Roll No:</Text>
              <View style={styles.studentLine} />
            </View>
            <View style={styles.studentField}>
              <Text style={styles.studentLabel}>Section:</Text>
              <View style={styles.studentLine} />
            </View>
          </View>

          {/* Sections */}
          {sections.map((section, secIdx) => {
            const secStartIndex = globalQuestionIndex;
            globalQuestionIndex += section.questions.length;

            return (
              <View key={secIdx} style={styles.sectionBlock} wrap={false}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                  {section.subtitle && (
                    <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
                  )}
                  {section.instruction && (
                    <Text style={styles.sectionInstruction}>
                      {section.instruction}
                    </Text>
                  )}
                </View>

                <View>
                  {section.questions.map((q, qIdx) => {
                    const diff = q.difficulty.toLowerCase().trim();
                    let badgeStyle = styles.badgeEasy;
                    let label = "EASY";

                    if (diff === "moderate" || diff === "medium") {
                      badgeStyle = styles.badgeModerate;
                      label = "MODERATE";
                    } else if (diff === "hard" || diff === "challenging") {
                      badgeStyle = styles.badgeHard;
                      label = "HARD";
                    }

                    return (
                      <View key={qIdx} style={styles.questionRow}>
                        <View style={styles.questionContent}>
                          <View style={styles.badgeContainer}>
                            <Text style={[styles.badgeText, badgeStyle]}>
                              {label}
                            </Text>
                          </View>
                          <Text style={styles.questionNumber}>
                            {secStartIndex + qIdx}.
                          </Text>
                          <Text style={styles.questionText}>{q.text}</Text>
                        </View>
                        <Text style={styles.questionMarks}>
                          [{q.marks} {q.marks === 1 ? "Mark" : "Marks"}]
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {/* Answer Key */}
          {answerKey && answerKey.length > 0 && (
            <View style={styles.answerKeyContainer} wrap={false}>
              <Text style={styles.answerKeyTitle}>Answer Key</Text>
              {answerKey.map((entry, idx) => (
                <View key={idx} style={styles.answerRow}>
                  <Text style={styles.answerNumber}>{entry.id}.</Text>
                  <Text style={styles.answerText}>{entry.answer}</Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  };
}

export function PDFExportButton(props: QuestionPaperPDFProps) {
  const [isClient, setIsClient] = useState(false);
  const [PDFDoc, setPDFDoc] = useState<ComponentType<QuestionPaperPDFProps> | null>(null);

  useEffect(() => {
    setIsClient(true);
    getPdfDocumentComponent().then((Component) => {
      setPDFDoc(() => Component);
    });
  }, []);

  if (!isClient || !PDFDoc) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-800 shadow-md opacity-70 cursor-not-allowed"
      >
        <Loader2 className="size-4 animate-spin" />
        <span>Loading PDF...</span>
      </button>
    );
  }

  const documentName = `${props.schoolName.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_exam.pdf`;

  return (
    <PDFDownloadLink
      document={<PDFDoc {...props} />}
      fileName={documentName}
    >
      {({ loading }) => (
        <button
          type="button"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-800 shadow-md hover:bg-neutral-50 hover:-translate-y-0.5 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5623]"
          aria-label="Download Question Paper as PDF"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4 text-neutral-700" />
          )}
          <span>Download PDF</span>
        </button>
      )}
    </PDFDownloadLink>
  );
}
