import { Inter } from "next/font/google";
import { QuestionPaperOutputShell } from "@/components/QuestionPaperOutputShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export default function AiToolkitOutputPage() {
  return (
    <div className={inter.variable}>
      <QuestionPaperOutputShell />
    </div>
  );
}
