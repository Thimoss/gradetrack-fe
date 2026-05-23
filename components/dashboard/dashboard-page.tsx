import { DashboardGradingQueue } from "./dashboard-grading-queue";
import { DashboardRecapPanel } from "./dashboard-recap-panel";
import { DashboardStatCard } from "./dashboard-stat-card";
import { DashboardTaskTable } from "./dashboard-task-table";
import { useDashboardPage } from "@/hooks/use-dashboard-page";

export function DashboardPage() {
  const { metrics, taskList, gradingQueue, recapItems } = useDashboardPage();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <header className="rounded-lg bg-slate-950 p-6 text-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-sky-300">
              GradeTrack dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal">
              Monitoring grading dan tasklist
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Pantau pekerjaan grading, tindak lanjut, dan rekap integrity
              peralatan dalam satu halaman.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-right max-sm:w-full max-sm:text-left">
            <p className="text-xs uppercase tracking-wide text-slate-300">
              Area kerja
            </p>
            <p className="mt-1 text-lg font-bold">IT Cikampek</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {metrics.map((metric) => (
          <DashboardStatCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_360px] gap-5 max-xl:grid-cols-1">
        <DashboardTaskTable tasks={taskList} />
        <DashboardRecapPanel items={recapItems} />
      </section>

      <DashboardGradingQueue items={gradingQueue} />
    </div>
  );
}
