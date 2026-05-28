import React from 'react';
import { X, ChevronDown, Trash2 } from 'lucide-react';
import CounterInput from './CounterInput';
import { useAssignmentStore, QuestionTypeOption } from '../store/useAssignmentStore';
import { motion } from 'framer-motion';

const QUESTION_TYPE_OPTIONS = [
  'Multiple Choice Questions',
  'Short Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'Custom Question Type',
];

interface QuestionTypeRowProps {
  questionType: QuestionTypeOption;
  onTypeChange: (type: string) => void;
  onRemove: () => void;
}

export default function QuestionTypeRow({ questionType, onTypeChange, onRemove }: QuestionTypeRowProps) {
  const {
    incrementQuestions,
    decrementQuestions,
    incrementMarks,
    decrementMarks,
  } = useAssignmentStore();

  return (
    <motion.div
      className="flex items-center gap-4 w-full mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      aria-label="Question type row"
    >
      <div className="flex items-center gap-2 flex-1">
        <div className="relative">
          <select
            className="appearance-none rounded-full bg-white border border-neutral-200 px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={questionType.type}
            onChange={(e) => onTypeChange(e.target.value)}
            aria-label="Question type"
          >
            {QUESTION_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
        <button
          onClick={onRemove}
          className="ml-2 p-1 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Remove question type"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div className="flex gap-4">
        <CounterInput
          value={questionType.questions}
          onIncrement={() => incrementQuestions(questionType.id)}
          onDecrement={() => decrementQuestions(questionType.id)}
          label="No. of Questions"
        />
        <CounterInput
          value={questionType.marks}
          onIncrement={() => incrementMarks(questionType.id)}
          onDecrement={() => decrementMarks(questionType.id)}
          label="Marks"
        />
      </div>
    </motion.div>
  );
}
