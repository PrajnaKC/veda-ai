import type { QuestionPaperData } from "@/data/questionPaper";

type PaperHeaderProps = {
  paperData: QuestionPaperData;
};

export function PaperHeader({ paperData }: PaperHeaderProps) {
  return (
    <header className="grid gap-2 text-center font-secondary text-[#333333]">
      <h1 className="text-[32px] font-bold leading-tight tracking-[-0.02em]">{paperData.school}</h1>
      <p className="text-[18px] font-semibold leading-tight">Subject: {paperData.subject}</p>
      <p className="text-[18px] font-semibold leading-tight">Class: {paperData.className}</p>
    </header>
  );
}
