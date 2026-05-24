"use client";

import type {
  DashboardCategoryCount,
  DashboardLocationRow,
} from "@/hooks/use-dashboard-page";
import { useDashboardPage } from "@/hooks/use-dashboard-page";

const trendLabel: Record<DashboardLocationRow["gradingKpi"]["trend"], string> =
  {
    UP: "UP",
    DOWN: "DOWN",
    FLAT: "STABLE",
  };

const trendClassName: Record<
  DashboardLocationRow["gradingKpi"]["trend"],
  string
> = {
  UP: "text-emerald-700",
  DOWN: "text-red-700",
  FLAT: "text-slate-600",
};

function CountCells({ count }: { count: DashboardCategoryCount }) {
  return (
    <>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.LOW}
      </td>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.MED}
      </td>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.HIGH}
      </td>
    </>
  );
}

function SummaryCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-bold text-neutral-950">{value}</p>
      <p className="mt-1 text-sm text-neutral-600">{helper}</p>
    </article>
  );
}

export function DashboardPage() {
  const {
    errorMessage,
    isLoading,
    metrics,
    period,
    setPeriod,
    summary,
  } = useDashboardPage();
  const hasRows = summary.rows.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <p className="text-sm font-bold uppercase text-slate-500">
            Rekap Data Grading
          </p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-950">
            Dashboard LTSA
          </h1>
        </div>
        <label className="grid gap-1 text-sm font-semibold text-neutral-800">
          Periode
          <input
            className="h-10 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-neutral-950"
            onChange={(event) => setPeriod(event.target.value)}
            type="month"
            value={period}
          />
        </label>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          helper="Lokasi pada master depot"
          label="Lokasi"
          value={metrics.locationCount}
        />
        <SummaryCard
          helper="Equipment dengan kategori after"
          label="Grading after"
          value={metrics.gradedEquipmentCount}
        />
        <SummaryCard
          helper={`${summary.totals.tasklist.real}/${summary.totals.tasklist.plan} realisasi`}
          label="Tasklist"
          value={`${metrics.tasklistProgress}%`}
        />
      </section>

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
          <div>
            <h2 className="text-base font-bold text-neutral-950">
              Rekap per lokasi
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Before, after, best before, KPI grading, dan tasklist plan/real.
            </p>
          </div>
          <p className="text-sm font-bold text-slate-600">
            {summary.periodLabel}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-center text-xs font-bold uppercase text-slate-700">
                <th
                  className="border border-zinc-200 px-3 py-3 text-left"
                  rowSpan={2}
                >
                  Lokasi
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Before
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  After
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Best Before
                </th>
                <th
                  className="border border-zinc-200 px-3 py-3"
                  rowSpan={2}
                >
                  KPI Grad
                </th>
                <th
                  className="border border-zinc-200 px-3 py-3"
                  rowSpan={2}
                >
                  Progress
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Tasklist
                </th>
              </tr>
              <tr className="bg-slate-50 text-center text-xs font-bold uppercase text-slate-600">
                {["LOW", "MED", "HIGH", "LOW", "MED", "HIGH", "LOW", "MED", "HIGH"].map(
                  (label, index) => (
                    <th className="border border-zinc-200 px-3 py-2" key={index}>
                      {label}
                    </th>
                  ),
                )}
                <th className="border border-zinc-200 px-3 py-2">Plan</th>
                <th className="border border-zinc-200 px-3 py-2">Real</th>
                <th className="border border-zinc-200 px-3 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="border border-zinc-200 px-4 py-8 text-center text-sm font-semibold text-slate-500"
                    colSpan={15}
                  >
                    Memuat dashboard...
                  </td>
                </tr>
              ) : null}

              {!isLoading && !hasRows ? (
                <tr>
                  <td
                    className="border border-zinc-200 px-4 py-8 text-center text-sm font-semibold text-slate-500"
                    colSpan={15}
                  >
                    Belum ada data lokasi untuk periode ini.
                  </td>
                </tr>
              ) : null}

              {!isLoading
                ? summary.rows.map((row) => (
                    <tr className="hover:bg-slate-50" key={row.depotId}>
                      <th className="sticky left-0 z-10 border border-zinc-200 bg-white px-3 py-3 text-left font-bold text-neutral-950">
                        <span className="block">{row.location}</span>
                        <span className="mt-1 block text-xs font-medium text-slate-500">
                          {row.city}
                        </span>
                      </th>
                      <CountCells count={row.before} />
                      <CountCells count={row.after} />
                      <CountCells count={row.bestBefore} />
                      <td
                        className={`border border-zinc-200 px-3 py-3 text-center font-bold ${trendClassName[row.gradingKpi.trend]}`}
                      >
                        {trendLabel[row.gradingKpi.trend]}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center font-bold text-neutral-950">
                        {row.gradingProgress}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        {row.tasklist.plan}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        {row.tasklist.real}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center font-bold text-neutral-950">
                        {row.tasklist.progress}%
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-neutral-950">
                <th className="border border-zinc-200 px-3 py-3 text-left">
                  Total
                </th>
                <CountCells count={summary.totals.before} />
                <CountCells count={summary.totals.after} />
                <CountCells count={summary.totals.bestBefore} />
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  -
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  -
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.plan}
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.real}
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.progress}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
    </div>
  );
}
