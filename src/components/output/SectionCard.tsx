import type { GeneratedSection } from "@/types/assignment";
import { DifficultyBadge } from "./DifficultyBadge";

export function SectionCard({ section }: { section: GeneratedSection }) {
  return (
    <section className="grid gap-6 py-4 border-b border-neutral-200 last:border-b-0">
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-neutral-900">{section.title}</h3>
        <p className="text-base italic text-neutral-600 mt-1">{section.instruction}</p>
      </div>
      <ol className="grid gap-4">
        {section.questions.map((question, index) => (
          <li key={`${question.text}-${index}`} className="grid gap-1">
            <div className="flex flex-wrap items-start gap-3">
              <span className="font-semibold text-neutral-500">{index + 1}.</span>
              <DifficultyBadge difficulty={question.difficulty} />
              <span className="flex-1 text-neutral-800">{question.text}</span>
              <span className="font-medium text-brand-orange">[{question.marks} Marks]</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
