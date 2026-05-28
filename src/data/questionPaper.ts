export type QuestionDifficulty = "Easy" | "Moderate" | "Challenging";

export type QuestionPaperQuestion = {
  id: number;
  difficulty: QuestionDifficulty;
  text: string;
  marks: number;
  answer: string;
};

export type QuestionPaperSection = {
  id: string;
  title: string;
  subtitle: string;
  helperText: string;
  questions: QuestionPaperQuestion[];
};

export type QuestionPaperData = {
  school: string;
  subject: string;
  className: string;
  timeAllowed: string;
  maximumMarks: number;
  responseMessage: string;
  sections: QuestionPaperSection[];
  questions: QuestionPaperQuestion[];
  answerKey: { id: number; answer: string }[];
  fileName: string;
};

const questions: QuestionPaperQuestion[] = [
  {
    id: 1,
    difficulty: "Easy",
    text: "Define electroplating. Explain its purpose.",
    marks: 2,
    answer:
      "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. It is used to prevent corrosion, improve appearance, or increase thickness."
  },
  {
    id: 2,
    difficulty: "Moderate",
    text: "What is the role of a conductor in the process of electrolysis?",
    marks: 2,
    answer:
      "A conductor allows the flow of electric current, causing ions in the electrolyte to move and enabling chemical changes at electrodes."
  },
  {
    id: 3,
    difficulty: "Easy",
    text: "Why does a solution of copper sulfate conduct electricity?",
    marks: 2,
    answer:
      "Copper sulfate solution contains free copper and sulfate ions which carry electric charge, thus conducting electricity."
  },
  {
    id: 4,
    difficulty: "Moderate",
    text: "Describe one example of the chemical effect of electric current in daily life.",
    marks: 2,
    answer: "An example is the electroplating of silver on jewelry to prevent tarnishing."
  },
  {
    id: 5,
    difficulty: "Moderate",
    text: "Explain why electric current is said to have chemical effects.",
    marks: 2,
    answer:
      "Electric current causes the movement of ions leading to chemical changes at the electrodes, hence it shows chemical effects."
  },
  {
    id: 6,
    difficulty: "Challenging",
    text: "How is sodium hydroxide prepared during the electrolysis of brine? Write the chemical reaction involved.",
    marks: 2,
    answer:
      "Sodium hydroxide is formed at the cathode during brine electrolysis as water gains electrons: 2H2O + 2e- -> H2 + 2OH-. Na+ + OH- -> NaOH (in solution)."
  },
  {
    id: 7,
    difficulty: "Challenging",
    text: "What happens at the cathode and anode during the electrolysis of water? Name the gases evolved.",
    marks: 2,
    answer:
      "At the cathode, water is reduced to hydrogen gas and hydroxide ions. At the anode, water is oxidized to oxygen gas and hydrogen ions."
  },
  {
    id: 8,
    difficulty: "Easy",
    text: "Mention the type of current used in electroplating and justify why it is used.",
    marks: 2,
    answer:
      "Direct current (DC) is used because it produces a consistent flow of electrons necessary for controlled deposition of metals."
  },
  {
    id: 9,
    difficulty: "Moderate",
    text: "What is the importance of electric current in the field of metallurgy?",
    marks: 2,
    answer:
      "Electric current helps extract metals from their ores and purify metals by electrolysis in metallurgy."
  },
  {
    id: 10,
    difficulty: "Challenging",
    text: "Explain with a chemical equation how copper is deposited during the electroplating of an object.",
    marks: 2,
    answer: "During copper electroplating, copper ions in solution gain electrons at the cathode and deposit as copper metal: Cu2+ + 2e- -> Cu (solid)."
  }
];

export const questionPaperData: QuestionPaperData = {
  school: "Delhi Public School, Sector-4, Bokaro",
  subject: "English",
  className: "5th",
  timeAllowed: "45 minutes",
  maximumMarks: 20,
  responseMessage:
    "Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:",
  sections: [
    {
      id: "section-a",
      title: "Section A",
      subtitle: "Short Answer Questions",
      helperText: "Attempt all questions. Each question carries 2 marks",
      questions
    }
  ],
  questions,
  answerKey: questions.map((question) => ({ id: question.id, answer: question.answer })),
  fileName: "question-paper.pdf"
};
