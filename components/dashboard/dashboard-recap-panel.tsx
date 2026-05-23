import type { DashboardRecapItem } from "@/hooks/use-dashboard-page";

type DashboardRecapPanelProps = {
  items: DashboardRecapItem[];
};

export function DashboardRecapPanel({ items }: DashboardRecapPanelProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-neutral-950">Rekap integrity</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Distribusi kategori hasil grading.
      </p>
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            className="rounded-lg border border-zinc-200 bg-slate-50 p-4"
            key={item.label}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  {item.description}
                </p>
              </div>
              <p className="text-2xl font-bold text-neutral-950">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
