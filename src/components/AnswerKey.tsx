import type { QuestionPaperData } from "@/data/questionPaper";

type AnswerKeyProps = {
  paperData: QuestionPaperData;
};

export function AnswerKey({ paperData }: AnswerKeyProps) {
  return (
    <section className="grid gap-4 font-secondary text-[#2D2D2D]">
      <h2 className="text-[16px] font-bold leading-tight">Answer Key:</h2>
      <ol className="grid gap-3 text-[16px] leading-[2.4]">
        {paperData.answerKey.map((entry) => (
          <li key={entry.id} className="flex items-start gap-2">
            <span className="min-w-5 font-medium">{entry.id}.</span>
            <span className="flex-1">{entry.answer}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
