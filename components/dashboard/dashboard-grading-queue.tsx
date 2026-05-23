import type { DashboardGradingItem } from "@/hooks/use-dashboard-page";

const categoryClassName: Record<DashboardGradingItem["category"], string> = {
  LOW: "bg-red-50 text-red-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  HIGH: "bg-emerald-50 text-emerald-700",
};

type DashboardGradingQueueProps = {
  items: DashboardGradingItem[];
};

export function DashboardGradingQueue({ items }: DashboardGradingQueueProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-base font-bold text-neutral-950">Antrian grading</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Draft dan hasil grading terbaru.
        </p>
      </div>
      <div className="divide-y divide-zinc-200">
        {items.map((item) => (
          <article
            className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4 max-sm:grid-cols-1"
            key={item.id}
          >
            <div>
              <p className="font-semibold text-neutral-950">{item.equipment}</p>
              <p className="mt-1 text-sm text-neutral-600">{item.type}</p>
              <p className="mt-1 text-xs text-neutral-500">{item.location}</p>
            </div>
            <div className="text-right max-sm:text-left">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${categoryClassName[item.category]}`}
              >
                {item.category}
              </span>
              <p className="mt-3 text-sm font-bold text-neutral-950">
                {item.score.toFixed(1).replace(".", ",")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
