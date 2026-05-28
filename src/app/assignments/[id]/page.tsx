import { notFound } from "next/navigation";
import { OutputPaper } from "@/components/output/OutputPaper";

export const dynamic = "force-dynamic";

type OutputApiResponse = {
  data?: {
    assignment?: Parameters<typeof OutputPaper>[0]["assignment"];
    generatedPaper?: Parameters<typeof OutputPaper>[0]["generatedPaper"];
  };
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssignmentOutputPage({ params }: PageProps) {
  const { id } = await params;
  const response = await fetch(`/api/output/${id}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    notFound();
  }

  const result = (await response.json()) as OutputApiResponse;
  const assignment = result.data?.assignment;
  const generatedPaper = result.data?.generatedPaper;

  if (!assignment) {
    notFound();
  }

  return <OutputPaper assignment={assignment} generatedPaper={generatedPaper} />;
}
