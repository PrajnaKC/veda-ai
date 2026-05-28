import type { QuestionPaperSection } from "@/data/questionPaper";

type QuestionListProps = {
  section: QuestionPaperSection;
};

export function QuestionList({ section }: QuestionListProps) {
  return (
    <section className="grid gap-4 font-secondary text-[#2E2E2E]">
      <div className="grid gap-1">
        <h2 className="text-[18px] font-semibold leading-tight">{section.subtitle}</h2>
        <p className="text-[14px] italic leading-tight text-[#595959]">{section.helperText}</p>
      </div>

      <ol className="grid gap-3 text-[13px] leading-[1.85]">
        {section.questions.map((question) => (
          <li key={question.id} className="flex items-start gap-2">
            <span className="min-w-4 font-semibold">{question.id}.</span>
            <span className="flex-1">
              <span className="font-medium text-[#3A3A3A]">[{question.difficulty}] </span>
              <span>{question.text}</span>
              <span className="font-medium text-[#3A3A3A]"> [{question.marks} Marks]</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
