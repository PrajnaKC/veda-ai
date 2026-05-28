export type AssignmentStatus = "queued" | "processing" | "completed" | "failed";

export type QuestionDifficulty = "easy" | "medium" | "hard";

export type QuestionType = {
  type: string;
  count: number;
  marks: number;
};

export type UploadedFile = {
  name: string;
  type: string;
  size: number;
  extractedText?: string;
};

export type GeneratedQuestion = {
  text: string;
  difficulty: QuestionDifficulty;
  marks: number;
};

export type GeneratedSection = {
  title: string;
  instruction: string;
  questions: GeneratedQuestion[];
};

export type GeneratedPaper = {
  sections: GeneratedSection[];
};

export type Assignment = {
  _id: string;
  title: string;
  institutionName: string;
  collegeName?: string;
  department: string;
  subject: string;
  courseCode: string;
  examType: string;
  semester: string;
  duration: string;
  totalMarks: number;
  dueDate: string;
  instructions?: string;
  questionTypes: QuestionType[];
  uploadedFile?: UploadedFile;
  status: AssignmentStatus;
  generatedPaper?: GeneratedPaper;
  jobId?: string;
  createdAt: string;
  updatedAt?: string;
};

export type AssignmentFormInput = Omit<
  Assignment,
  "_id" | "status" | "generatedPaper" | "jobId" | "createdAt" | "updatedAt"
>;
