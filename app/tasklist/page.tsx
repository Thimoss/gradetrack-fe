import { MasterLayout } from "@/components/layout/master-layout";
import { GeneratorTasklistPage } from "@/components/tasklist/generator-tasklist-page";

export default function TasklistRoute() {
  return (
    <MasterLayout>
      <GeneratorTasklistPage />
    </MasterLayout>
  );
}
