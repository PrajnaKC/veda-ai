import { notFound } from "next/navigation";
import { OutputPaper } from "@/components/output/OutputPaper";

export const dynamic = "force-dynamic";

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

  const result = (await response.json()) as { data?: { assignment?: Parameters<typeof OutputPaper>[0]["assignment"] } };
  const assignment = result.data?.assignment;

  if (!assignment) {
    notFound();
  }

  return <OutputPaper assignment={assignment} />;
}
