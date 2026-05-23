import type { DashboardMetric } from "@/hooks/use-dashboard-page";

const toneClassName: Record<DashboardMetric["tone"], string> = {
  blue: "border-sky-100 bg-sky-50 text-sky-700",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  slate: "border-slate-200 bg-slate-50 text-slate-800",
};

type DashboardStatCardProps = {
  metric: DashboardMetric;
};

export function DashboardStatCard({ metric }: DashboardStatCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div
        className={`inline-flex rounded-lg border px-3 py-1 text-xs font-bold uppercase tracking-wide ${toneClassName[metric.tone]}`}
      >
        {metric.label}
      </div>
      <p className="mt-5 text-3xl font-bold text-neutral-950">
        {metric.value}
      </p>
      <p className="mt-2 text-sm text-neutral-600">{metric.helper}</p>
    </article>
  );
}
