import { create } from 'zustand';

export type QuestionTypeOption = {
  id: string;
  type: string;
  questions: number;
  marks: number;
};

interface AssignmentState {
  uploadedFile: File | null;
  dueDate: string;
  questionTypes: QuestionTypeOption[];
  additionalInfo: string;
  addQuestionType: (type?: string) => void;
  removeQuestionType: (id: string) => void;
  incrementQuestions: (id: string) => void;
  decrementQuestions: (id: string) => void;
  incrementMarks: (id: string) => void;
  decrementMarks: (id: string) => void;
  setDueDate: (date: string) => void;
  setFile: (file: File | null) => void;
  setAdditionalInfo: (info: string) => void;
  totalQuestions: number;
  totalMarks: number;
}

const DEFAULT_QUESTION_TYPES: QuestionTypeOption[] = [
  { id: 'mcq', type: 'Multiple Choice Questions', questions: 4, marks: 1 },
  { id: 'short', type: 'Short Questions', questions: 3, marks: 2 },
  { id: 'diagram', type: 'Diagram/Graph-Based Questions', questions: 5, marks: 5 },
  { id: 'numerical', type: 'Numerical Problems', questions: 5, marks: 5 },
];

export const useAssignmentStore = create<AssignmentState>((set, get) => ({
  uploadedFile: null,
  dueDate: '',
  questionTypes: [...DEFAULT_QUESTION_TYPES],
  additionalInfo: '',
  addQuestionType: (type = 'Custom Question Type') => {
    set((state) => ({
      questionTypes: [
        ...state.questionTypes,
        {
          id: `${Date.now()}-${Math.random()}`,
          type,
          questions: 1,
          marks: 1,
        },
      ],
    }));
  },
  removeQuestionType: (id) => {
    set((state) => ({
      questionTypes: state.questionTypes.filter((qt) => qt.id !== id),
    }));
  },
  incrementQuestions: (id) => {
    set((state) => ({
      questionTypes: state.questionTypes.map((qt) =>
        qt.id === id ? { ...qt, questions: qt.questions + 1 } : qt
      ),
    }));
  },
  decrementQuestions: (id) => {
    set((state) => ({
      questionTypes: state.questionTypes.map((qt) =>
        qt.id === id && qt.questions > 1 ? { ...qt, questions: qt.questions - 1 } : qt
      ),
    }));
  },
  incrementMarks: (id) => {
    set((state) => ({
      questionTypes: state.questionTypes.map((qt) =>
        qt.id === id ? { ...qt, marks: qt.marks + 1 } : qt
      ),
    }));
  },
  decrementMarks: (id) => {
    set((state) => ({
      questionTypes: state.questionTypes.map((qt) =>
        qt.id === id && qt.marks > 1 ? { ...qt, marks: qt.marks - 1 } : qt
      ),
    }));
  },
  setDueDate: (date) => set({ dueDate: date }),
  setFile: (file) => set({ uploadedFile: file }),
  setAdditionalInfo: (info) => set({ additionalInfo: info }),
  get totalQuestions() {
    return get().questionTypes.reduce((sum, qt) => sum + qt.questions, 0);
  },
  get totalMarks() {
    return get().questionTypes.reduce((sum, qt) => sum + qt.questions * qt.marks, 0);
  },
}));
