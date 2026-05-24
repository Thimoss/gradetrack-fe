import { MasterLayout } from "@/components/layout/master-layout";
import { TasklistPage } from "@/components/tasklist/tasklist-page";

export default function TasklistRoute() {
  return (
    <MasterLayout>
      <TasklistPage />
    </MasterLayout>
  );
}
