import { MasterLayout } from "@/components/layout/master-layout";
import { SubmissionDetailPage } from "@/components/submissions/submission-detail-page";

type PageProps = {
  params: Promise<{
    kind: "grading" | "tasklist";
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id, kind } = await params;

  return (
    <MasterLayout>
      <SubmissionDetailPage id={id} kind={kind} />
    </MasterLayout>
  );
}
