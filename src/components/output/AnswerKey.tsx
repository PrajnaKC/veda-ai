"use client";

type AnswerKeyEntry = {
  id: number | string;
  answer: string;
};

type AnswerKeyProps = {
  answerKey: AnswerKeyEntry[];
};

export function AnswerKey({ answerKey }: AnswerKeyProps) {
  if (!answerKey || answerKey.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t-2 border-dashed border-neutral-300 [page-break-inside:avoid] break-inside-avoid">
      <h3 className="text-center text-[20px] sm:text-[22px] font-bold text-neutral-800 uppercase tracking-widest mb-6">
        ANSWER KEY
      </h3>
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        {answerKey.map((entry, index) => (
          <div key={index} className="flex items-start gap-3">
            <span className="text-[15px] sm:text-[16px] font-bold text-neutral-800 shrink-0">
              {entry.id}.
            </span>
            <p className="text-[15px] sm:text-[16px] text-neutral-700 leading-relaxed font-normal">
              {entry.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
